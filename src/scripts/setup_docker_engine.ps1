Invoke-ExecuteWithUACRights {
    try {
        $dockerEnginePath = Get-Command docker -ErrorAction SilentlyContinue
        if ($null -eq $dockerEnginePath) {
            Invoke-ExecuteInTempDir {
                param($tempDir)
                Write-PrefixMsg "Docker Engine is not installed. Installing Docker Engine..."
                choco install docker -y
                Write-PrefixMsg "Docker Engine installation complete!"
            }
        }
        else {
            Write-PrefixMsg "Docker Engine is already installed."
        }
    }
    catch {
        Write-Error $_
    }
}
