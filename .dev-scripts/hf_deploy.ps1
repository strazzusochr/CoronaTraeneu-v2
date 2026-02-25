<#
.SYNOPSIS
    All-in-One Deploy: Build → Push → Restart Space
.DESCRIPTION
    Baut das Projekt, pusht zu HuggingFace, und startet den Space
    automatisch neu. Ersetzt komplett den manuellen Dev Mode Toggle!
.NOTES
    Einmalig: $env:HF_TOKEN = "hf_xxx..."
#>
param(
    [string]$Token = $env:HF_TOKEN,
    [string]$SpaceId = "Wrzzzrzr/CoronaTraeneu",
    [switch]$SkipBuild,
    [switch]$SkipPush,
    [string]$CommitMessage = "deploy: automatic deployment"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = (Get-Item "$PSScriptRoot\..").FullName
$UltimateDir = Join-Path $ProjectRoot "corona-control-ultimate"

Write-Host ""
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "  Corona Control — Full Deploy Pipeline" -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor Magenta
Write-Host ""

# 1. Build
if (-not $SkipBuild) {
    Write-Host "[1/4] Baue Projekt..." -ForegroundColor Yellow
    Push-Location $UltimateDir
    try {
        npm run build 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  BUILD FEHLGESCHLAGEN!" -ForegroundColor Red
            Pop-Location
            exit 1
        }
        Write-Host "  Build erfolgreich!" -ForegroundColor Green
    } finally {
        Pop-Location
    }
} else {
    Write-Host "[1/4] Build uebersprungen (--SkipBuild)" -ForegroundColor DarkGray
}

# 2. Git Status Check
Write-Host "[2/4] Pruefe Git-Status..." -ForegroundColor Yellow
Push-Location $ProjectRoot
try {
    $status = git status --porcelain 2>&1
    if ($status) {
        Write-Host "  Uncommitted Changes gefunden. Committe automatisch..." -ForegroundColor Yellow
        git add -A
        git commit -m $CommitMessage
        Write-Host "  Committed!" -ForegroundColor Green
    } else {
        Write-Host "  Arbeitsbereich sauber." -ForegroundColor Green
    }
} finally {
    Pop-Location
}

# 3. Push zu HuggingFace
if (-not $SkipPush) {
    Write-Host "[3/4] Pushe zu HuggingFace..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    try {
        # Prüfe ob hf remote existiert
        $remotes = git remote -v 2>&1
        if ($remotes -match "hf") {
            git push hf main 2>&1
            if ($LASTEXITCODE -ne 0) {
                Write-Host "  Push fehlgeschlagen! Versuche force push..." -ForegroundColor Yellow
                git push hf main --force 2>&1
            }
            Write-Host "  Push zu HuggingFace erfolgreich!" -ForegroundColor Green
        } else {
            Write-Host "  WARNUNG: 'hf' Remote nicht gefunden!" -ForegroundColor Red
            Write-Host "  Fuege hinzu: git remote add hf https://huggingface.co/spaces/Wrzzzrzr/CoronaTraeneu" -ForegroundColor Yellow
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "[3/4] Push uebersprungen (--SkipPush)" -ForegroundColor DarkGray
}

# 4. Space neu starten (umgeht Dev Mode Toggle!)
Write-Host "[4/4] Starte Space neu via API..." -ForegroundColor Yellow
& "$PSScriptRoot\hf_restart.ps1" -Token $Token -SpaceId $SpaceId

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  DEPLOY KOMPLETT!" -ForegroundColor Green
Write-Host "  Dev Mode Toggle? NICHT MEHR NOETIG!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
