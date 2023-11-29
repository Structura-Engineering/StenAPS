Invoke-ExecuteWithUACRights {
    try {
        $chocoPath = Get-Command choco -ErrorAction SilentlyContinue
        if ($null -eq $chocoPath) {
            Invoke-ExecuteInTempDir {
                param($tempDir)
                Write-PrefixMsg "Chocolatey is not installed. Installing Chocolatey..."
                Set-ExecutionPolicy Bypass -Scope Process -Force
                [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
                Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
                Write-PrefixMsg "Chocolatey installation complete!"
            }
        }
        else {
            Write-PrefixMsg "Chocolatey is already installed."
        }
    }
    catch {
        Write-Error $_
    }
}
