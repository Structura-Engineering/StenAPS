function Show-AsciiArt {
    $ascii_art = @"
============================================================

███████╗████████╗███████╗███╗   ██╗ █████╗ ██████╗ ███████╗™
██╔════╝╚══██╔══╝██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔════╝
███████╗   ██║   █████╗  ██╔██╗ ██║███████║██████╔╝███████╗
╚════██║   ██║   ██╔══╝  ██║╚██╗██║██╔══██║██╔═══╝ ╚════██║
███████║   ██║   ███████╗██║ ╚████║██║  ██║██║     ███████║
╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚══════╝

Structura-Engineering™
============================================================
"@

    $ascii_art_placeholder = "StenAPS™"
    $windowWidth = (Get-Host).UI.RawUI.WindowSize.Width

    if ($windowWidth -lt 70) {
        $ascii_art = $ascii_art_placeholder
    }

    return $ascii_art
}

function Write-PrefixMsg {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        $messages,
        [ConsoleColor]$color = [ConsoleColor]::White,
        [string]$prefix = "(Setup): "
    )

    if ($messages -isnot [array]) {
        $messages = @(@{ message = $messages; color = $color })
    }

    Write-Host -NoNewline $prefix -ForegroundColor Magenta
    $messages | ForEach-Object { Write-Host -NoNewline $_.message -ForegroundColor $_.color }
    Write-Host ""
}

function Write-Error {
    param($Err)
    Write-PrefixMsg "An error occurred: $($Err.Exception.Message)" -color Red
}
function Get-UserConfirmation {
    param (
        [Parameter(Mandatory = $true)]
        [string]$message
    )

    Write-PrefixMsg ("$message [Y/N]") -color Gray
    $userInput = Read-Host

    while ($userInput -notin 'Y', 'N') {
        Write-PrefixMsg "Invalid input. Please enter 'Y' for Yes or 'N' for No." -color Yellow
        $userInput = Read-Host
    }

    return $userInput
}

try {    
    $scripts = [ordered]@{
        "setup_python.ps1"       = @();
        "setup_venv.ps1"         = @("setup_python.ps1");
        "setup_pip_packages.ps1" = @("setup_venv.ps1");
        "setup_unittests.ps1"    = @("setup_pip_packages.ps1");
        "run_unittests.ps1"      = @("setup_unittests.ps1")
    }

    do {
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
        $choice = Read-Host
        while ($choice -ne 'A' -and $choice -ne '0' -and -not ($choice -gt 0 -and $choice -le $scripts.Count)) {
            Write-PrefixMsg "Invalid input. Please enter 'A' (All), a number from '1-$($scripts.Count)' (Script no.), or '0' (Exit)." -color Yellow
            $choice = Read-Host
        }
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
    } while ($choice -ne 0)

    Write-PrefixMsg "Setup complete!" -color Green
    Pause
    Clear-Host
}
catch {
    Write-Error $_
}
