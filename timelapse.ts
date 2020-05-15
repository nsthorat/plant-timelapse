import * as videoshow from 'videoshow';
import * as path from 'path';
import * as fs from 'fs';
import { createTimelapse } from './util';

const TMP_PATH = '/tmp/timelapse-plant-stills';

// 1 / x kept
const KEEP_FRAME_RATE = 1;
const START_IMAGE = 95;

const files = fs.readdirSync('stills/');
const images: string[] = [];
files.slice(START_IMAGE).forEach((filename, i) => {
  if (i % KEEP_FRAME_RATE === 0) {
    images.push(`${filename}`);
  }
});
console.log('keeping', images);
images.forEach((image, i) => {
  fs.copyFileSync(`stills/${image}`, `${TMP_PATH}/${image}`);
})

async function main() {
  const date = getFormattedTime();
  try {
    await createTimelapse({
      fps: 25,
      // Glob matching input files
      inputFiles: `${TMP_PATH}/*.jpg`,
      output: path.resolve(`videos/${date}.mp4`),
    });
  } catch (error) {
    throw new Error(error.message)
  }
}
main();


function getFormattedTime() {
  var today = new Date();
  var y = today.getFullYear();
  // JavaScript months are 0-based.
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var h = today.getHours();
  var mi = today.getMinutes();
  var s = today.getSeconds();
  return [y, m, d, h, mi, s].join('_');
}