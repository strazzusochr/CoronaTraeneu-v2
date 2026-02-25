<#
.SYNOPSIS
    HuggingFace Space Restart - umgeht den Dev Mode Toggle komplett!
.DESCRIPTION
    Startet den HuggingFace Space "Wrzzzrzr/CoronaTraeneu" ueber die API neu.
    Kein manuelles Dev Mode Toggle mehr noetig!
.NOTES
    Einmalig: Token erstellen auf https://huggingface.co/settings/tokens
    Dann: $env:HF_TOKEN = "hf_xxx..."
    Oder als Parameter: .\hf_restart.ps1 -Token "hf_xxx..."
#>
param(
    [string]$Token = $env:HF_TOKEN,
    [string]$SpaceId = "Wrzzzrzr/CoronaTraeneu",
    [switch]$FactoryReboot
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  HuggingFace Space Restart Tool" -ForegroundColor Cyan
Write-Host "  Space: $SpaceId" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Token pruefen
if (-not $Token) {
    Write-Host "FEHLER: Kein HuggingFace Token gefunden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Loesung:" -ForegroundColor Yellow
    Write-Host '  1. Gehe zu: https://huggingface.co/settings/tokens' -ForegroundColor Yellow
    Write-Host '  2. Erstelle einen Token mit Write Berechtigung' -ForegroundColor Yellow
    Write-Host '  3. Fuehre aus: $env:HF_TOKEN = "hf_dein_token_hier"' -ForegroundColor Yellow
    Write-Host '  4. Dann dieses Script erneut starten' -ForegroundColor Yellow
    Write-Host ""
    Write-Host '  Oder direkt: .\hf_restart.ps1 -Token "hf_xxx..."' -ForegroundColor Yellow
    exit 1
}

$tokenPreview = $Token.Substring(0, [Math]::Min(10, $Token.Length))
Write-Host "Token gefunden: ${tokenPreview}..." -ForegroundColor Green

# Aktuellen Status pruefen
Write-Host ""
Write-Host "[1/3] Pruefe aktuellen Space-Status..." -ForegroundColor Yellow
$statusUrl = "https://huggingface.co/api/spaces/$SpaceId"
$headers = @{ "Authorization" = "Bearer $Token" }

try {
    $response = Invoke-RestMethod -Uri $statusUrl -Headers $headers -Method Get
    $currentStatus = $response.runtime.stage
    Write-Host "  Aktueller Status: $currentStatus" -ForegroundColor Cyan
}
catch {
    Write-Host "  Status konnte nicht abgerufen werden." -ForegroundColor Yellow
    Write-Host "  Versuche Restart trotzdem..." -ForegroundColor Yellow
}

# Space neu starten
Write-Host ""
if ($FactoryReboot) {
    Write-Host "[2/3] Factory Reboot (kompletter Rebuild)..." -ForegroundColor Yellow
    $restartUrl = "https://huggingface.co/api/spaces/$SpaceId/restart?factory=true"
}
else {
    Write-Host "[2/3] Space neu starten..." -ForegroundColor Yellow
    $restartUrl = "https://huggingface.co/api/spaces/$SpaceId/restart"
}

try {
    $response = Invoke-RestMethod -Uri $restartUrl -Headers $headers -Method Post
    Write-Host "  Restart erfolgreich ausgeloest!" -ForegroundColor Green
}
catch {
    Write-Host "  Fehler beim Restart. Versuche Fallback: Pause + Unpause..." -ForegroundColor Yellow
    try {
        $pauseUrl = "https://huggingface.co/api/spaces/$SpaceId/pause"
        Invoke-RestMethod -Uri $pauseUrl -Headers $headers -Method Post | Out-Null
        Start-Sleep -Seconds 3
        Invoke-RestMethod -Uri $restartUrl -Headers $headers -Method Post | Out-Null
        Write-Host "  Pause/Unpause erfolgreich!" -ForegroundColor Green
    }
    catch {
        Write-Host "  Auch Fallback fehlgeschlagen." -ForegroundColor Red
        exit 1
    }
}

# Status nach Restart pruefen
Write-Host ""
Write-Host "[3/3] Warte auf neuen Status..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

try {
    $response = Invoke-RestMethod -Uri $statusUrl -Headers $headers -Method Get
    $newStatus = $response.runtime.stage
    Write-Host "  Neuer Status: $newStatus" -ForegroundColor Cyan

    if ($newStatus -eq "BUILDING") {
        Write-Host ""
        Write-Host "BUILD LAEUFT!" -ForegroundColor Green
        Write-Host "  Der Space baut gerade neu (3-5 Min)." -ForegroundColor Green
        Write-Host "  Pruefe: https://huggingface.co/spaces/$SpaceId" -ForegroundColor Cyan
    }
    elseif ($newStatus -eq "RUNNING") {
        Write-Host ""
        Write-Host "SPACE LAEUFT BEREITS!" -ForegroundColor Green
        Write-Host "  Oeffne: https://huggingface.co/spaces/$SpaceId" -ForegroundColor Cyan
    }
    else {
        Write-Host ""
        Write-Host "Status: $newStatus - bitte manuell pruefen." -ForegroundColor Yellow
        Write-Host "  https://huggingface.co/spaces/$SpaceId" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "  Status nicht abrufbar. Bitte manuell pruefen:" -ForegroundColor Yellow
    Write-Host "  https://huggingface.co/spaces/$SpaceId" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Fertig! Kein Dev Mode Toggle mehr noetig." -ForegroundColor Green
Write-Host ""
