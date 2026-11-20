@echo off
cd /d "%~dp0public\images"
curl -sL -o draw-1.jpg "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80"
curl -sL -o draw-2.jpg "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
curl -sL -o draw-3.jpg "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=900&q=80"
curl -sL -o draw-4.jpg "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=900&q=80"
curl -sL -o class-1.jpg "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=900&q=80"
curl -sL -o class-2.jpg "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
curl -sL -o class-3.jpg "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
curl -sL -o class-4.jpg "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80"
echo DONE
dir draw*.jpg class*.jpg
