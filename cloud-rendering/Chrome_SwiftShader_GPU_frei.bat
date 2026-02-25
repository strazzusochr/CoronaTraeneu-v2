@echo off
echo ============================================
echo  Corona Control - GPU-FREIER Modus
echo  Rendert ueber CPU (SwiftShader)
echo  Deine GPU: 0%% Last!
echo ============================================
echo.
echo Starte Chrome mit CPU-Rendering...

REM Finde Chrome Installation
set CHROME_PATH=
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
)
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
)

REM Versuche auch Brave Browser
if "%CHROME_PATH%"=="" (
    if exist "%LOCALAPPDATA%\BraveSoftware\Brave-Browser\Application\brave.exe" (
        set "CHROME_PATH=%LOCALAPPDATA%\BraveSoftware\Brave-Browser\Application\brave.exe"
    )
)

if "%CHROME_PATH%"=="" (
    echo FEHLER: Chrome oder Brave nicht gefunden!
    pause
    exit /b 1
)

echo Browser gefunden: %CHROME_PATH%
echo.
echo Starte mit SwiftShader (CPU-Rendering)...
echo GPU-Last wird 0%% sein!
echo.

start "" "%CHROME_PATH%" ^
    --enable-unsafe-swiftshader ^
    --use-gl=swiftshader ^
    --disable-gpu ^
    --disable-gpu-compositing ^
    --use-angle=swiftshader ^
    --new-window ^
    "https://wrzzzrzr-coronatraeneu.hf.space/"

echo.
echo Chrome gestartet! Dein Spiel oeffnet sich gleich.
echo Pruefe im Task-Manager: GPU sollte bei 0%% sein!
echo.
echo Hinweis: Performance kann niedriger sein (CPU rendert statt GPU).
echo Das ist normal - dafuer bleibt deine GPU kuhl!
echo.
pause
