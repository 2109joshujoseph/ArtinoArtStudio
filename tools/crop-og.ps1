param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Destination
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile((Resolve-Path $Source))

# The OG card is 1200x630 CSS px at devicePixelRatio 1.25 -> 1500x787.5 device px.
$cropW = [int][Math]::Round(1200 * 1.25)
$cropH = [int][Math]::Round(630 * 1.25)

$crop = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
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

$outPath = Join-Path (Get-Location) $Destination
$final.Save($outPath, $codec, $params)

$params.Dispose()
$final.Dispose()
$crop.Dispose()
$src.Dispose()

Write-Output ("wrote " + $outPath)
