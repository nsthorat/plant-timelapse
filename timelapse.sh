#gsutil -m cp gs://timelapse-plant-stills/stills/*.jpg stills
cd /home/nikhilio/plant-timelapse/

rm -rf /tmp/timelapse-plant-stills
mkdir -p /tmp/timelapse-plant-stills

yarn ts-node /home/nikhilio/plant-timelapse/timelapse.ts
