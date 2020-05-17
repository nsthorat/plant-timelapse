import * as videoshow from 'videoshow';
import * as path from 'path';
import * as fs from 'fs';
import { createTimelapse } from './util';

const HOME_PATH = '/home/nsthorat';
const STILLS_PATH = `${HOME_PATH}/gcs-timelapse-plant-stills/stills`;
const TMP_VIDEO_PATH = `${HOME_PATH}`;

const FPS = 20;
console.log(STILLS_PATH);


// TODO: Add filenames, and a bit saying what the last image read is.

async function main() {
  const date = getFormattedTime();
  try {
    await createTimelapse({
      fps: FPS,
      // Glob matching input files
      inputFiles: `${STILLS_PATH}/stills/*.jpg`,
      output: `${TMP_VIDEO_PATH}/latest.mp4`,
    });
    fs.writeFileSync(`${TMP_VIDEO_PATH}/manifest.json`, JSON.stringify({
      date: `${new Date().toLocaleString()}`,
      fps: FPS
    }));
  } catch (error) {
    throw new Error(error.message)
  }
}
main();


function getFormattedTime() {
  var today = new Date();
  var y = today.getFullYear();
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var h = today.getHours();
  var mi = today.getMinutes();
  var s = today.getSeconds();
  return [y, m, d, h, mi, s].join('_');
}
