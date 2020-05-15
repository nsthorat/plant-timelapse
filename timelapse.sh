gsutil -m cp gs://timelapse-plant-stills/stills/*.jpg stills
rm -rf /tmp/timelapse-plant-stills
mkdir -p /tmp/timelapse-plant-stills

yarn ts-node timelapse.ts