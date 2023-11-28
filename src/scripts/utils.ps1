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

function Invoke-ExecuteInTempDir {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [ScriptBlock]$scriptBlock
    )

    $tempDir = "$env:TEMP\StenAPS"
    
    try {
        if (Test-Path $tempDir) {
            Remove-Item -Path $tempDir -Recurse -Force
        }
        $null = New-Item -ItemType Directory -Path $tempDir

        & $scriptBlock $tempDir
    }
    finally {
        if (Test-Path $tempDir) {
            Remove-Item -Path $tempDir -Recurse -Force
        }
    }

    return $tempDir
}

function Invoke-ExecuteWithUACRights {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [ScriptBlock]$scriptBlock
    )

    if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-PrefixMsg "This script must be run as an Administrator. Please restart VSCode as Administrator and try again." -color Red
    }
    else {
        & $scriptBlock
    }
}

