set -e

cd /home/nikhilio/plant-timelapse/

DATE=$(date +%Y-%m-%d_%H_%M_%S.jpg)

raspistill -v -o /home/nikhilio/stills/$DATE

gsutil cp /home/nikhilio/stills/$DATE gs://timelapse-plant-stills/stills

/home/nikhilio/plant-timelapse/timelapse.sh

#gsutil cp /home/nikhilio/videos/latest.mp4 gs://timelapse-plant-stills/videos
gsutil cp /home/nikhilio/videos/manifest.json gs://timelapse-plant-stills/videos

gsutil setmeta -h "Cache-Control:private, max-age=0, no-transform" gs://timelapse-plant-stills/videos/*
#fswebcam -D 2 -S 20 --set brightness=60% --set contrast=40%  -F 10 -r 640x480 --no-banner stills/$DATE
#fswebcam -r 960x540 --no-banner stills/%Y-%m-%d_%H_%M_%S.jpg

