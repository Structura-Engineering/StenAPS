Invoke-ExecuteWithUACRights {
    try {
        $workDir = Get-UserInput -prompt "Enter Working Directory in Container (e.g., /app):"
        $scriptName = Get-UserInput -prompt "Enter Script File Name (e.g., your_script.ps1):"

        $dockerfileContent = @"
FROM mcr.microsoft.com/powershell:latest
WORKDIR $workDir
COPY . .
CMD ["pwsh", "-File", "$scriptName"]
"@

        $dockerfilePath = ".\Dockerfile"
        $dockerfileContent | Set-Content -Path $dockerfilePath -Force

        Write-PrefixMsg "Dockerfile created successfully! You can find it at $dockerfilePath."
    }
    catch {
        Write-Error $_
    }
}
