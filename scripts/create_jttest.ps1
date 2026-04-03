Import-Module BcContainerHelper -Force
$artifact = Get-BcArtifactUrl -country gb -type Sandbox -select Latest
Write-Host "Artifact: $artifact"
New-BcContainer -accept_eula `
    -containerName "JTTest" `
    -credential (New-Object pscredential("john", (ConvertTo-SecureString "John1234" -AsPlainText -Force))) `
    -auth NavUserPassword `
    -artifactUrl $artifact `
    -memoryLimit 4GB `
    -includePerformanceToolkit
