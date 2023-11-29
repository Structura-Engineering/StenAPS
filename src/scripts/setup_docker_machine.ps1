Invoke-ExecuteWithUACRights {
    try {
        $dockerMachinePath = Get-Command docker-machine -ErrorAction SilentlyContinue
        if ($null -eq $dockerMachinePath) {
            Invoke-ExecuteInTempDir {
                param($tempDir)
                Write-PrefixMsg "Docker Machine is not installed. Installing Docker Machine..."
                choco install docker-machine -y
                Write-PrefixMsg "Docker Machine installation complete!"
            }
        }
        else {
            Write-PrefixMsg "Docker Machine is already installed."
        }
    }
    catch {
        Write-Error $_
    }
}
