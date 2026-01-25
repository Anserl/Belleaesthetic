@echo off
echo Creando favicon.ico redondo con color rosa Belle Aesthetic...
powershell -Command ^
"$bmp = New-Object System.Drawing.Bitmap 32,32; ^
$graphics = [System.Drawing.Graphics]::FromImage($bmp); ^
$graphics.Clear([System.Drawing.Color]::Transparent); ^
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(212,165,165)); ^
$graphics.FillEllipse($brush, 2, 2, 28, 28); ^
$font = New-Object System.Drawing.Font('Arial',14,[System.Drawing.FontStyle]::Bold); ^
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White); ^
$graphics.DrawString('B', $font, $textBrush, 8, 6); ^
$icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon()); ^
$file = New-Object System.IO.FileStream('favicon.ico', [System.IO.FileMode]::Create); ^
$icon.Save($file); ^
$file.Close(); ^
$graphics.Dispose(); ^
$bmp.Dispose(); ^
Write-Host 'Favicon.ico creado exitosamente'"
echo Favicon.ico creado con color rosa #D4A5A5 y forma redonda
pause
