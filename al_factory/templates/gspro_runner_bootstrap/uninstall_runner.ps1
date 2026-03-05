# GSPro Runner Uninstall Script
# Run as Administrator on GSPro (Windows)

param(
    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$ErrorActionPreference = "Stop"

Write-Host "=== GSPro Runner Uninstall ===" -ForegroundColor Cyan

$RunnerPath = "C:\actions-runner"

# Confirm
if (-not $Force) {
    Write-Host "This will stop and remove the runner service." -ForegroundColor Yellow
    Write-Host "Runner folder: $RunnerPath" -ForegroundColor White
    $confirm = Read-Host "Continue? (y/n)"
    if ($confirm -ne "y") {
        Write-Host "Cancelled" -ForegroundColor White
        exit 0
    }
}

# Stop service
Write-Host "`n[1/3] Stopping service..." -ForegroundColor Yellow

$svc = Get-Service -Name "actions-runner" -ErrorAction SilentlyContinue
if ($svc) {
    Stop-Service -Name "actions-runner" -Force -ErrorAction SilentlyContinue
    Write-Host "Service stopped" -ForegroundColor Green
} else {
    Write-Host "Service not found" -ForegroundColor Yellow
}

# Uninstall service
Write-Host "`n[2/3] Uninstalling service..." -ForegroundColor Yellow

if (Test-Path "$RunnerPath\svc.bat") {
    Set-Location $RunnerPath
    & "$RunnerPath\svc.bat" stop 2>$null
    & "$RunnerPath\svc.bat" uninstall 2>$null
    Write-Host "Service uninstalled" -ForegroundColor Green
} else {
    # Try to remove service via PowerShell
    $svc = Get-Service -Name "actions-runner" -ErrorAction SilentlyContinue
    if ($svc) {
        Stop-Service -Name "actions-runner" -Force -ErrorAction SilentlyContinue
        & "sc.exe" delete "actions-runner" 2>$null
        Write-Host "Service removed" -ForegroundColor Green
    }
}

# Remove folder
Write-Host "`n[3/3] Removing runner folder..." -ForegroundColor Yellow

if (Test-Path $RunnerPath) {
    if (-not $Force) {
        $confirm = Read-Host "Delete folder $RunnerPath ? (y/n)"
        if ($confirm -ne "y") {
            Write-Host "Folder preserved" -ForegroundColor White
        } else {
            Remove-Item $RunnerPath -Recurse -Force
            Write-Host "Folder removed" -ForegroundColor Green
        }
    } else {
        Remove-Item $RunnerPath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Folder removed" -ForegroundColor Green
    }
} else {
    Write-Host "Folder not found" -ForegroundColor Yellow
}

Write-Host "`n=== Uninstall Complete ===" -ForegroundColor Green
