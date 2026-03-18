# GSPro Runner Install Script
# Run as Administrator on GSPro (Windows)

param(
    [Parameter(Mandatory=$false)]
    [string]$RepoUrl = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Token = "",
    
    [Parameter(Mandatory=$false)]
    [string]$RunnerName = "gspro-01",
    
    [Parameter(Mandatory=$false)]
    [string]$Labels = "gspro,windows",
    
    [Parameter(Mandatory=$false)]
    [switch]$UseServiceAccount
)

$ErrorActionPreference = "Stop"

Write-Host "=== GSPro Runner Install ===" -ForegroundColor Cyan

# Get current directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RunnerPath = $ScriptDir

# Check if we're in the runner folder
if (-not (Test-Path "$RunnerPath\config.cmd")) {
    Write-Host "ERROR: Run this script from the runner folder (C:\actions-runner)" -ForegroundColor Red
    exit 1
}

# Prompt for inputs if not provided
if ([string]::IsNullOrEmpty($RepoUrl)) {
    Write-Host "`nRepository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/johntaylormfc/openclaw" -ForegroundColor White
    $RepoUrl = Read-Host "Repo URL"
}

if ([string]::IsNullOrEmpty($Token)) {
    Write-Host "`nRunner Token (from GitHub):" -ForegroundColor Yellow
    Write-Host "Go to: https://github.com/OWNER/REPO/settings/actions/runners" -ForegroundColor White
    $Token = Read-Host "Token" -AsSecureString
    $Token = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($Token))
}

# Configure runner
Write-Host "`n[1/3] Configuring runner..." -ForegroundColor Yellow

$configCmd = ".\config.cmd --unattended --url `"$RepoUrl`" --token `"$Token`" --name `"$RunnerName`" --labels `"$Labels`" --work _work --replace"
Write-Host "Running: $configCmd" -ForegroundColor White

Set-Location $RunnerPath
Invoke-Expression $configCmd

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Configuration failed" -ForegroundColor Red
    exit 1
}

Write-Host "OK: Runner configured" -ForegroundColor Green

# Install as service
Write-Host "`n[2/3] Installing service..." -ForegroundColor Yellow

if ($UseServiceAccount) {
    Write-Host "Installing under user 'bot'..." -ForegroundColor White
    Write-Host "You will be prompted for password" -ForegroundColor Yellow
    
    $svc = Get-Service -Name "actions-runner" -ErrorAction SilentlyContinue
    if ($svc) {
        Write-Host "Stopping existing service..." -ForegroundColor White
        Stop-Service -Name "actions-runner" -Force -ErrorAction SilentlyContinue
    }
    
    # Create service with bot account
    $cred = Get-Credential -UserName "bot" -Message "Enter password for bot account"
    
    $binaryPath = "$RunnerPath\runsvc.cmd"
    New-Service -Name "actions-runner" -BinaryPathName $binaryPath -Credential $cred -DisplayName "GitHub Actions Runner" -Description "Self-hosted GitHub Actions runner" -Force
    
    Write-Host "OK: Service installed under bot account" -ForegroundColor Green
} else {
    # LocalSystem (default)
    Write-Host "Installing under LocalSystem..." -ForegroundColor White
    
    $svc = Get-Service -Name "actions-runner" -ErrorAction SilentlyContinue
    if ($svc) {
        Write-Host "Stopping existing service..." -ForegroundColor White
        Stop-Service -Name "actions-runner" -Force -ErrorAction SilentlyContinue
        & "$RunnerPath\svc.bat" uninstall 2>$null
    }
    
    & "$RunnerPath\svc.bat" install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Service install failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "OK: Service installed under LocalSystem" -ForegroundColor Green
}

# Start service
Write-Host "`n[3/3] Starting service..." -ForegroundColor Yellow

Start-Service -Name "actions-runner" -ErrorAction SilentlyContinue
Start-Sleep 3

$svc = Get-Service -Name "actions-runner"
Write-Host "Service Status: $($svc.Status)" -ForegroundColor $(if ($svc.Status -eq "Running") { "Green" } else { "Red" })

Write-Host "`n=== Install Complete ===" -ForegroundColor Green
Write-Host "Runner: $RunnerName" -ForegroundColor White
Write-Host "Labels: $Labels" -ForegroundColor White
Write-Host ""
Write-Host "Verify in GitHub:" -ForegroundColor Cyan
Write-Host "  https://github.com/$RepoUrl.Replace('https://github.com/','')/settings/actions/runners" -ForegroundColor White
