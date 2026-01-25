@echo off
echo Creando favicon.ico elegante para centro estetico...
powershell -Command ^
"$bmp = New-Object System.Drawing.Bitmap 32,32; ^
$graphics = [System.Drawing.Graphics]::FromImage($bmp); ^
$graphics.SmoothingMode = 'AntiAlias'; ^
$graphics.Clear([System.Drawing.Color]::Transparent); ^
"
echo Creando fondo con gradiente...
powershell -Command ^
"$brush1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232,213,196)); ^
$brush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(212,165,165)); ^
$graphics.FillEllipse($brush1, 1, 1, 30, 30); ^
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(248,242,232), 1); ^
$graphics.DrawEllipse($pen, 1, 1, 30, 30); ^
"
echo Creando flor de belleza...
powershell -Command ^
"$centerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(184,139,139)); ^
$petalBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(138,150,130)); ^
$graphics.FillEllipse($centerBrush, 14, 14, 4, 4); ^
for($i=0; $i -lt 5; $i++) { ^
    $angle = $i * 72 * [Math]::PI / 180; ^
    $x = 16 + [Math]::Cos($angle) * 6; ^
    $y = 16 + [Math]::Sin($angle) * 6; ^
    $graphics.FillEllipse($petalBrush, $x-2, $y-3, 4, 6); ^
} ^
"
echo Creando archivo ICO...
powershell -Command ^
"$icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon()); ^
$file = New-Object System.IO.FileStream('favicon.ico', [System.IO.FileMode]::Create); ^
$icon.Save($file); ^
$file.Close(); ^
$graphics.Dispose(); ^
$bmp.Dispose(); ^
Write-Host 'Favicon.ico elegante creado exitosamente'"
echo Listo! Favicon con diseño de flor para centro estetico
pause
