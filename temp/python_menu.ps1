. .\scripts\utils.ps1

$scripts = [ordered]@{
    "setup_python.ps1"       = @();
    "setup_venv.ps1"         = @("setup_python.ps1");
    "setup_pip_packages.ps1" = @("setup_venv.ps1");
    "setup_unittests.ps1"    = @("setup_pip_packages.ps1");
    "run_unittests.ps1"      = @("setup_unittests.ps1")
}
