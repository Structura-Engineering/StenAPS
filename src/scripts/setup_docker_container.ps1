. .\src\scripts\utils.ps1

Invoke-ExecuteWithUACRights {
    try {
        $dockerService = Get-Service -Name 'docker' -ErrorAction SilentlyContinue
        if ($null -eq $dockerService) {
            Write-PrefixMsg "Docker service not found. Please install Docker."
        }
        elseif ($dockerService.Status -ne 'Running') {
            Write-PrefixMsg "Docker service is not running. Starting Docker service..."
            Start-Service -Name 'docker'
            Write-PrefixMsg "Docker service started successfully!"
        }
        else {
            Write-PrefixMsg "Docker service is already running."
        }

        $dockerImage = "your-image-name"

        $imageExists = docker images --format "{{.Repository}}" | Where-Object { $_ -eq $dockerImage }

        if (-not $imageExists) {
            Write-PrefixMsg "Docker image $dockerImage not found. Pulling from Docker Hub..."
            docker pull $dockerImage
            Write-PrefixMsg "Docker image $dockerImage pulled successfully!"
        }
        else {
            Write-PrefixMsg "Docker image $dockerImage already exists."
        }

        Write-PrefixMsg "Running a container from the $dockerImage image..."
        docker run -d $dockerImage
        Write-PrefixMsg "Docker container started successfully!"
    }
    catch {
        Write-Error $_
    }
}
