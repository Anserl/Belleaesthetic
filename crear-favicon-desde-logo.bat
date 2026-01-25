@echo off
echo Creando favicon.ico desde el logo de Belle Aesthetic...
echo.

powershell -Command ^
"[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing'); ^
$imgPath = 'img\Logo-letra-transparente.png'; ^
if (Test-Path $imgPath) { ^
    $originalImg = [System.Drawing.Image]::FromFile($imgPath); ^
    $bmp = New-Object System.Drawing.Bitmap 32,32; ^
    $graphics = [System.Drawing.Graphics]::FromImage($bmp); ^
    $graphics.SmoothingMode = 'AntiAlias'; ^
    $graphics.Clear([System.Drawing.Color]::Transparent); ^
    $rect = New-Object System.Drawing.Rectangle(0, 0, 32, 32); ^
    $graphics.DrawImage($originalImg, $rect, 0, 0, $originalImg.Width, $originalImg.Height, [System.Drawing.GraphicsUnit]::Pixel); ^
    $icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon()); ^
    $file = New-Object System.IO.FileStream('favicon.ico', [System.IO.FileMode]::Create); ^
    $icon.Save($file); ^
    $file.Close(); ^
    $graphics.Dispose(); ^
    $bmp.Dispose(); ^
    $originalImg.Dispose(); ^
    Write-Host '✅ Favicon.ico creado desde el logo exitosamente'; ^
} else { ^
    Write-Host '❌ No se encuentra el archivo: img\Logo-letra-transparente.png'; ^
}"

echo.
echo Listo! El favicon.ico ha sido creado usando tu logo.
pause
