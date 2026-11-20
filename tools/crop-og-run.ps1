Add-Type -AssemblyName System.Drawing

$Source = 'C:\Users\JOSHUJ~1\AppData\Local\Temp\opencode-browser-ZmqJTg\0\screenshot.png'
$Destination = Join-Path $env:TEMP 'artino-og-image.jpg'

$src = [System.Drawing.Image]::FromFile($Source)

$insetX = 8
$insetY = 8
$cropW = 1500 - ($insetX * 2)
$cropH = 788 - ($insetY * 2)

$crop = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), (New-Object System.Drawing.Rectangle($insetX, $insetY, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$final = New-Object System.Drawing.Bitmap(1200, 630)
$g2 = [System.Drawing.Graphics]::FromImage($final)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.DrawImage($crop, 0, 0, 1200, 630)
$g2.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$final.Save($Destination, $codec, $params)

$params.Dispose()
$final.Dispose()
$crop.Dispose()
$src.Dispose()

Write-Output ('wrote ' + $Destination)
