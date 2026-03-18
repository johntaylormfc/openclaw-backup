# GSPro Runner Bootstrap Script
# Run as Administrator on GSPro (Windows)

param(
    [string]$RunnerVersion = "2.320.0",
    [string]$InstallPath = "C:\actions-runner"
)

Write-Host "=== GSPro Runner Bootstrap ===" -ForegroundColor Cyan

# Check PowerShell version
Write-Host "`n[1/5] Checking PowerShell..." -ForegroundColor Yellow
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Host "ERROR: PowerShell 5.0+ required" -ForegroundColor Red
    exit 1
}
Write-Host "OK: PowerShell $($PSVersionTable.PSVersion)" -ForegroundColor Green

# Check Docker
Write-Host "`n[2/5] Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK: $dockerVersion" -ForegroundColor Green
    } else {
        Write-Host "WARNING: Docker not found or not accessible" -ForegroundColor Red
    }
} catch {
    Write-Host "WARNING: Docker not found: $_" -ForegroundColor Red
}

# Check Docker container mode
Write-Host "`n[3/5] Checking Docker container mode..." -ForegroundColor Yellow
try {
    $dockerInfo = docker info --format "{{.OSType}}" 2>&1
    if ($dockerInfo -eq "windows") {
        Write-Host "OK: Windows containers" -ForegroundColor Green
    } else {
        Write-Host "NOTE: Current mode: $dockerInfo (Windows containers recommended for BC)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "WARNING: Could not check Docker mode" -ForegroundColor Yellow
}

# Check BcContainerHelper
Write-Host "`n[4/5] Checking BcContainerHelper..." -ForegroundColor Yellow
if (Get-Module -ListAvailable -Name BcContainerHelper) {
    Write-Host "OK: BcContainerHelper installed" -ForegroundColor Green
} else {
    Write-Host "WARNING: BcContainerHelper not installed" -ForegroundColor Yellow
    Write-Host "Install with: Install-Module BcContainerHelper -Force" -ForegroundColor White
}

# Check Git
Write-Host "`n[5/5] Checking Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK: $gitVersion" -ForegroundColor Green
    } else {
        Write-Host "WARNING: Git not found" -ForegroundColor Red
    }
} catch {
    Write-Host "WARNING: Git not found: $_" -ForegroundColor Red
}

# Create folder
Write-Host "`n[6/6] Downloading runner..." -ForegroundColor Yellow
if (-not (Test-Path $InstallPath)) {
    New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null
}

$runnerZip = "$InstallPath\runner.zip"
$runnerUrl = "https://github.com/actions/runner/releases/download/v$RunnerVersion/actions-runner-win-x64-$RunnerVersion.zip"

Write-Host "Downloading: $runnerUrl" -ForegroundColor White
try {
    Invoke-WebRequest -Uri $runnerUrl -OutFile $runnerZip -UseBasicParsing
    Write-Host "Download complete" -ForegroundColor Green
} catch {
    Write-Host "ERROR downloading: $_" -ForegroundColor Red
    exit 1
}

# Extract
Write-Host "Extracting..." -ForegroundColor Yellow
Expand-Archive -Path $runnerZip -DestinationPath $InstallPath -Force
Remove-Item $runnerZip -Force

Write-Host "`n=== Bootstrap Complete ===" -ForegroundColor Green
Write-Host "Runner extracted to: $InstallPath" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. cd $InstallPath" -ForegroundColor White
Write-Host "2. .\config.cmd --unattended --url https://github.com/johntaylormfc/REPO --token TOKEN --name gspro-01 --labels gspro,windows" -ForegroundColor White
Write-Host "3. .\svc.bat install" -ForegroundColor White
Write-Host "4. .\svc.bat start" -ForegroundColor White
