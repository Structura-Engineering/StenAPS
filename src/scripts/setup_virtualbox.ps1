. .\src\scripts\utils.ps1

Invoke-ExecuteWithUACRights {
    try {
        $virtualBoxPath = Get-Command VBoxManage -ErrorAction SilentlyContinue
        if ($null -eq $virtualBoxPath) {
            Invoke-ExecuteInTempDir {
                param($tempDir)
                Write-PrefixMsg "VirtualBox is not installed. Installing VirtualBox..."
                choco install virtualbox -y
                Write-PrefixMsg "VirtualBox installation complete!"                
            }
            $virtualBoxPath = Get-Command VBoxManage -ErrorAction SilentlyContinue
        }

        if ($null -eq $virtualBoxPath) {
            $batchFileContent = '@"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" %*'
            Set-Content -Path "C:\Windows\System32\VBoxManage.bat" -Value $batchFileContent
            Write-PrefixMsg "Created a batch file for VBoxManage."
        }
        else {
            Write-PrefixMsg "VirtualBox is already installed."
        }
    }
    catch {
        Write-Error $_
    }
}
