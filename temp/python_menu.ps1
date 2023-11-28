. .\scripts\utils.ps1

$scripts = [ordered]@{
    "setup_python.ps1"       = @();
    "setup_venv.ps1"         = @("setup_python.ps1");
    "setup_pip_packages.ps1" = @("setup_venv.ps1");
    "setup_unittests.ps1"    = @("setup_pip_packages.ps1");
    "run_unittests.ps1"      = @("setup_unittests.ps1")
}

function Show-Menu {
    Write-PrefixMsg "$(Show-AsciiArt)" -color Red -prefix ""
    Write-PrefixMsg "Please select a script to run:" -color Cyan
    Write-PrefixMsg "[A]: Run All Scripts" -color Green
    $i = 0
    foreach ($script in $scripts.Keys) {
        $i++
        $scriptNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($script)
        $dependencies = $scripts[$script] -join ', '
        if ($dependencies) {
            Write-PrefixMsg @(
                @{message = "[${i}]: ${scriptNameWithoutExtension}"; color = "White" },
                @{message = " (Dependencies: ${dependencies})"; color = "Gray" }
            )
        }
        else {
            Write-PrefixMsg "[${i}]: ${scriptNameWithoutExtension}" -color White
        }
    }        
    Write-PrefixMsg "[0]: Exit" -color Red
    $inputOptions = "A,1-" + $scripts.Count + ",0"
    Write-PrefixMsg "Enter your choice [$inputOptions]:" -color Gray
}

function Get-Choice($scripts) {
    $choice = Read-Host
    while ($choice -ne 'A' -and $choice -ne '0' -and -not ($choice -gt 0 -and $choice -le $scripts.Count)) {
        Write-PrefixMsg "Invalid input. Please enter 'A' (All), a number from '1-$($scripts.Count)' (Script no.), or '0' (Exit)." -color Yellow
        $choice = Read-Host
    }
    return $choice
}

function Invoke-Scripts($scripts, $choice) {
    if ($choice -eq 'A') {
        foreach ($script in $scripts.Keys) {
            Write-PrefixMsg "Running $script..." -color Cyan
            & ".\scripts\$script"
        }
    }
    elseif ($choice -gt 0 -and $choice -le $scripts.Count) {
        $script = $scripts.Keys[$choice - 1]
        Write-PrefixMsg "Running $script..." -color Cyan
        & ".\scripts\$script"
    }
}

function Run {
    try {
        do {
            Show-Menu
            $choice = Get-Choice $scripts
            Invoke-Scripts $scripts $choice
        } while ($choice -ne 0)

        Write-PrefixMsg "Setup complete!" -color Green
        Pause
        Clear-Host
    }
    catch {
        Write-Error $_
    }
}

Run
