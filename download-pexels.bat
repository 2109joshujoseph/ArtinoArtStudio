@echo off
cd /d "%~dp0public\images"
curl -sL -o pexels-1.jpg "https://images.pexels.com/photos/159579/paint-painting-artist-art-159579.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-2.jpg "https://images.pexels.com/photos/1021277/pexels-photo-1021277.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-3.jpg "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-4.jpg "https://images.pexels.com/photos/3740545/pexels-photo-3740545.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-5.jpg "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-6.jpg "https://images.pexels.com/photos/5904939/pexels-photo-5904939.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-7.jpg "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-8.jpg "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-9.jpg "https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg?auto=compress&cs=tinysrgb&w=900"
curl -sL -o pexels-10.jpg "https://images.pexels.com/photos/1321973/pexels-photo-1321973.jpeg?auto=compress&cs=tinysrgb&w=900"
echo DONE
dir pexels*.jpg
