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
            $dockerMachinePath = Get-Command docker-machine -ErrorAction SilentlyContinue
        }
        else {
            Write-PrefixMsg "Docker Machine is already installed."
        }

        if ($null -ne $dockerMachinePath) {
            $dockerMachineExists = docker-machine ls -q | Where-Object { $_ -eq 'default' }
            if ($null -eq $dockerMachineExists) {
                Write-PrefixMsg "Creating a new Docker Machine..."
                docker-machine create --driver virtualbox default
                Write-PrefixMsg "Docker Machine 'default' created!"
            }
            else {
                Write-PrefixMsg "Docker Machine 'default' already exists."
            }
        }
    }
    catch {
        Write-Error $_
    }
}
