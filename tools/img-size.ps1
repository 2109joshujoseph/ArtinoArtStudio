Add-Type -AssemblyName System.Drawing
$i = [System.Drawing.Image]::FromFile((Resolve-Path 'public/images/og-image.jpg'))
Write-Output ("og-image: " + $i.Width + "x" + $i.Height)
$i.Dispose()
