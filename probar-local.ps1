# probar-local.ps1 — instala PHP (solo la primera vez) y abre la página
# con un servidor local que SÍ ejecuta PHP. No subir este archivo a Hostinger.

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$sitio  = $PSScriptRoot
$phpDir = Join-Path $env:LOCALAPPDATA 'php-local'
$phpExe = Join-Path $phpDir 'php.exe'

if (-not (Test-Path $phpExe)) {
    Write-Host "Descargando PHP (solo la primera vez)..." -ForegroundColor Cyan
    $zip = Join-Path $env:TEMP 'php-local.zip'
    $urls = @(
        'https://windows.php.net/downloads/releases/latest/php-8.3-Win32-vs16-x64-latest.zip',
        'https://windows.php.net/downloads/releases/latest/php-8.4-Win32-vs17-x64-latest.zip',
        'https://windows.php.net/downloads/releases/latest/php-8.2-Win32-vs16-x64-latest.zip'
    )
    $ok = $false
    foreach ($u in $urls) {
        try { Invoke-WebRequest -Uri $u -OutFile $zip -UseBasicParsing; $ok = $true; Write-Host "OK: $u"; break }
        catch { Write-Host "No disponible: $u" }
    }
    if (-not $ok) { throw "No se pudo descargar PHP." }

    Expand-Archive -Path $zip -DestinationPath $phpDir -Force
    Remove-Item $zip

    # php.ini con openssl y mbstring activados
    $ini = Get-Content (Join-Path $phpDir 'php.ini-development')
    $ini = $ini -replace '^;\s*extension_dir\s*=\s*"ext"', 'extension_dir = "ext"' `
                -replace '^;extension=openssl', 'extension=openssl' `
                -replace '^;extension=mbstring', 'extension=mbstring'
    Set-Content -Path (Join-Path $phpDir 'php.ini') -Value $ini -Encoding ASCII
    Write-Host "PHP instalado en $phpDir" -ForegroundColor Green
}

& $phpExe -v
& $phpExe -m | Select-String -Pattern 'openssl|mbstring'

Write-Host ""
Write-Host "Servidor en http://localhost:8000/contact.html  (cierra esta ventana para detenerlo)" -ForegroundColor Green
Start-Process 'http://localhost:8000/contact.html'
& $phpExe -S localhost:8000 -t $sitio
