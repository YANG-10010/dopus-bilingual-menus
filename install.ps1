<#
.SYNOPSIS
  One-click installer for Directory Opus Bilingual Power Menus (UI / Tabs / Select).
.DESCRIPTION
  Installs CustomMenusI18n.js, CustomMenus.dop, bundled third-party script add-ins
  (SelectEx, Column.FileAge), .ofi filters, DOpus9 icons, and optional Evaluator/Label configs.
#>
param(
    [string]$OpusDataPath = "",
    [switch]$SkipDependencies,
    [switch]$InstallLabelAndEvalConfigs
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($OpusDataPath)) {
    $OpusDataPath = Join-Path $env:APPDATA "GPSoftware\Directory Opus"
}

if (-not (Test-Path -LiteralPath $OpusDataPath)) {
    Write-Error "Directory Opus config folder not found at: $OpusDataPath`nPass -OpusDataPath 'X:\Path\To\Directory Opus' for portable installations."
    exit 1
}

Write-Host "Target Directory Opus config path: $OpusDataPath" -ForegroundColor Cyan

$running = Get-Process dopus -ErrorAction SilentlyContinue
if ($running) {
    Write-Warning "Directory Opus (dopus.exe) is currently running. Toolbar and script add-ins can load hot, or restart Opus after installation if installing ConfigFiles (.oxc)."
}

$repoRoot = $PSScriptRoot

function Copy-SafeFile {
    param([string]$Src, [string]$Dst, [switch]$Overwrite)
    $dstDir = Split-Path -Parent $Dst
    if (-not (Test-Path -LiteralPath $dstDir)) {
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
    }
    if ((Test-Path -LiteralPath $Dst) -and (-not $Overwrite)) {
        Write-Host "  [Skip existing] $Dst" -ForegroundColor DarkGray
        return
    }
    Copy-Item -LiteralPath $Src -Destination $Dst -Force
    Write-Host "  [Installed] $Dst" -ForegroundColor Green
}

Write-Host "`n1. Installing CustomMenusI18n.js & CustomMenus.dop..." -ForegroundColor Yellow
Copy-SafeFile -Src (Join-Path $repoRoot "Script AddIns\CustomMenusI18n.js") `
              -Dst (Join-Path $OpusDataPath "Script AddIns\CustomMenusI18n.js") -Overwrite
Copy-SafeFile -Src (Join-Path $repoRoot "Buttons\CustomMenus.dop") `
              -Dst (Join-Path $OpusDataPath "Buttons\CustomMenus.dop") -Overwrite

if (-not $SkipDependencies) {
    Write-Host "`n2. Installing required third-party Script Add-Ins (SelectEx, Column.FileAge)..." -ForegroundColor Yellow
    Get-ChildItem -LiteralPath (Join-Path $repoRoot "Dependencies\Script AddIns") -File | ForEach-Object {
        Copy-SafeFile -Src $_.FullName -Dst (Join-Path $OpusDataPath "Script AddIns\$($_.Name)")
    }

    Write-Host "`n3. Installing 15 .ofi Selection Filters..." -ForegroundColor Yellow
    Get-ChildItem -LiteralPath (Join-Path $repoRoot "Dependencies\Filters") -Filter "*.ofi" | ForEach-Object {
        Copy-SafeFile -Src $_.FullName -Dst (Join-Path $OpusDataPath "Filters\$($_.Name)")
    }

    Write-Host "`n4. Installing DOpus9 legacy icon set..." -ForegroundColor Yellow
    $iconSrc = Join-Path $repoRoot "Dependencies\Icons\DOpus9.dis"
    if (Test-Path -LiteralPath $iconSrc) {
        Copy-SafeFile -Src $iconSrc -Dst (Join-Path $OpusDataPath "Icons\DOpus9.dis")
    }
}

if ($InstallLabelAndEvalConfigs) {
    Write-Host "`n5. Installing Evaluator Columns & Label Assignment configs (backing up originals)..." -ForegroundColor Yellow
    $backupStamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupFolder = Join-Path $OpusDataPath "User Data\ConfigBackup-$backupStamp"
    New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

    foreach ($cfgName in @("evalcols.oxc", "colorgroups.oxc", "foldercolors.oxc")) {
        $targetCfg = Join-Path $OpusDataPath "ConfigFiles\$cfgName"
        if (Test-Path -LiteralPath $targetCfg) {
            Copy-Item -LiteralPath $targetCfg -Destination (Join-Path $backupFolder $cfgName) -Force
            Write-Host "  [Backup] Saved $cfgName -> $backupFolder" -ForegroundColor DarkCyan
        }
        Copy-SafeFile -Src (Join-Path $repoRoot "Dependencies\ConfigFiles\$cfgName") -Dst $targetCfg -Overwrite
    }
}

Write-Host "`nDone! In Directory Opus:" -ForegroundColor Cyan
Write-Host "  - Enable toolbar 'CustomMenus' (Right-click toolbar -> Toolbars -> CustomMenus), OR"
Write-Host "  - Enter Customize mode and drag buttons from Buttons\SingleMenus\ onto your Operations toolbar."
Write-Host "  - Switch UI language anytime in Preferences -> User Interface -> Language, or run: CustomMenusLang LANG=toggle"
