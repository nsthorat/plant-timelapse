import * as ffmpeg from "fluent-ffmpeg";
import * as path from "path";
// Types
interface Progress {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
}

interface Options {
  inputFiles: string|string[];
  fps: number;
  output: string;
}
/**
   * Create Timelapse using ffmpeg
   * @param options Options:
   *  * output: the output location
   *  * inputFiles: the input location
   *  * fps: set the frames per second
   */
export const createTimelapse = ({ output, fps, inputFiles }: Options): Promise<ffmpeg.FfmpegCommand> => {
 return new Promise((resolve, reject) => {
   let files: string[];
   if (!Array.isArray(inputFiles)) {
     files = [inputFiles];
   } else {
     files = inputFiles;
   }
   let lastOutput = ffmpeg();
   files.forEach(file => {
      lastOutput = lastOutput.addInput(file);
    });
   
         
   lastOutput
     // allow the glob pattern to take affect
     .inputOptions("-pattern_type glob")
     .noAudio()
     // options for scale/crop/aspect ratio
     .outputOptions([
       `-r ${fps}`,
       `-pix_fmt yuv420p`,
       // scale and crop to HD
       `-vf scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080`
     ])
     .videoCodec("libx264")
     .on("progress", (data: Progress) => {
       // log number of frames complete
       console.log("Frames completed:", data.frames);
     })
     .on("error", err => {
        console.error("Error during processing", err);
       reject(err);
     })
     // return promise after processing is complete
     .on("end", () => {
        console.log("Processing finished !");
       resolve();
     })
     // save the file to the desired locations
     .save(output); 
 });
};