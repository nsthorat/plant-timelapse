cd /home/nsthorat/plant-timelapse/

yarn ts-node /home/nsthorat/plant-timelapse/timelapse.ts

gsutil cp /home/nsthorat/tmp-videos/* gs://timelapse-plant-stills/videos
