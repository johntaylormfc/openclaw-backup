# Windows Connectivity Check Script
# Save as: win_connectivity_check.ps1
# Run: .\win_connectivity_check.ps1 -Hostname bcuk-stage9-smoketest.lan -BeelinkIP 192.168.1.146

param(
    [string]$Hostname = "bcuk-stage9-smoketest.lan",
    [string]$BeelinkIP = "192.168.1.146",
    [int]$ProxyPort = 80,
    [int]$WebPort = 18000,
    [int]$DevPort = 19000
)

Write-Host "=== BC Container Connectivity Check ===" -ForegroundColor Cyan
Write-Host "Hostname: $Hostname"
Write-Host "Beelink IP: $BeelinkIP"
Write-Host ""

$issues = @()

# Test 1: DNS Resolution
Write-Host "[1/4] Testing DNS resolution for $Hostname..." -ForegroundColor Yellow
try {
    $dns = Resolve-DnsName -Name $Hostname -ErrorAction Stop
    Write-Host "  PASS: Resolved to $($dns.IPAddress)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: DNS not resolved" -ForegroundColor Red
    Write-Host "  -> Add to hosts file:" -ForegroundColor Yellow
    Write-Host "     $BeelinkIP  $Hostname" -ForegroundColor White
    $issues += "DNS not resolved"
}

# Test 2: Proxy Port
Write-Host "[2/4] Testing proxy port $ProxyPort..." -ForegroundColor Yellow
$proxyTest = Test-NetConnection -ComputerName $BeelinkIP -Port $ProxyPort -WarningAction SilentlyContinue
if ($proxyTest.TcpTestSucceeded) {
    Write-Host "  PASS: Proxy port open" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Cannot connect to proxy port $ProxyPort" -ForegroundColor Red
    Write-Host "  -> Check firewall or proxy running" -ForegroundColor Yellow
    $issues += "Proxy port blocked"
}

# Test 3: Web Port
Write-Host "[3/4] Testing web port $WebPort..." -ForegroundColor Yellow
$webTest = Test-NetConnection -ComputerName $BeelinkIP -Port $WebPort -WarningAction SilentlyContinue
if ($webTest.TcpTestSucceeded) {
    Write-Host "  PASS: Web port open" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Cannot connect to web port $WebPort" -ForegroundColor Red
    Write-Host "  -> Check firewall or container running" -ForegroundColor Yellow
    $issues += "Web port blocked"
}

# Test 4: Dev Port
Write-Host "[4/4] Testing dev port $DevPort..." -ForegroundColor Yellow
$devTest = Test-NetConnection -ComputerName $BeelinkIP -Port $DevPort -WarningAction SilentlyContinue
if ($devTest.TcpTestSucceeded) {
    Write-Host "  PASS: Dev port open" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Cannot connect to dev port $DevPort" -ForegroundColor Red
    Write-Host "  -> Required for AL publish/debug" -ForegroundColor Yellow
    $issues += "Dev port blocked"
}

# Summary
Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
if ($issues.Count -eq 0) {
    Write-Host "All checks PASSED!" -ForegroundColor Green
    Write-Host "You can now use VS Code AL to publish/debug"
    Write-Host ""
    Write-Host "URLs:"
    Write-Host "  Web:  http://$Hostname/"
    Write-Host "  Dev:  http://$BeelinkIP`:$DevPort"
} else {
    Write-Host "Issues found: $($issues.Count)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Add hosts entry:" -ForegroundColor White
    Write-Host "     notepad C:\Windows\System32\drivers\etc\hosts" -ForegroundColor Gray
    Write-Host "     Add: $BeelinkIP  $Hostname" -ForegroundColor White
    Write-Host "  2. Check firewall on Beelink" -ForegroundColor White
    Write-Host "  3. Ensure bc-proxy is running" -ForegroundColor White
}
