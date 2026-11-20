Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Split-Path -Parent $PSScriptRoot) 'public\images\og-image.jpg'
$src = [System.Drawing.Image]::FromFile($srcPath)

$rect = New-Object System.Drawing.Rectangle(0, 0, 220, 140)
$crop = New-Object System.Drawing.Bitmap(220, 140)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, 220, 140)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# upscale 3x for inspection
$big = New-Object System.Drawing.Bitmap(660, 420)
$g2 = [System.Drawing.Graphics]::FromImage($big)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g2.DrawImage($crop, 0, 0, 660, 420)
$g2.Dispose()

$out = Join-Path $env:TEMP 'artino-og-corner.png'
$big.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$big.Dispose()
$crop.Dispose()
$src.Dispose()
Write-Output $out
