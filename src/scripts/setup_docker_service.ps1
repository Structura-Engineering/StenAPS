. .\src\scripts\utils.ps1

Invoke-ExecuteWithUACRights {
    try {
        $dockerServicePath = Get-Service docker -ErrorAction SilentlyContinue
        if ($null -eq $dockerServicePath) {
            Invoke-ExecuteInTempDir {
                param($tempDir)
                Write-PrefixMsg "Docker Service is not installed. Installing Docker Service..."
                choco install docker-service -y
                Write-PrefixMsg "Docker Service installation complete!"
            }
        }
        else {
            Write-PrefixMsg "Docker Service is already installed."
        }
    }
    catch {
        Write-Error $_
    }
}
