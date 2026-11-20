@echo off
cd /d "%~dp0public\images"
curl -sL -o candidate-1.jpg "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-2.jpg "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-3.jpg "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-4.jpg "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-5.jpg "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-6.jpg "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-7.jpg "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80"
curl -sL -o candidate-8.jpg "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=80"
curl -sL -o faculty-4.jpg "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
curl -sL -o studio.jpg "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1200&q=80"
curl -sL -o cta-bg.jpg "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=80"
echo DONE
dir candidate*.jpg faculty-4.jpg studio.jpg
