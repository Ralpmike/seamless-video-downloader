// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// const ffmpeg = createFFmpeg({ log: true });

// export async function mergeAudioVideo(videoUrl: string, audioUrl: string): Promise<Blob> {
//   if (!ffmpeg.isLoaded()) {
//     await ffmpeg.load();
//   }

//   ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoUrl));
//   ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioUrl));

//   await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp3', '-c', 'copy', 'output.mp4');

//   const data = ffmpeg.FS('readFile', 'output.mp4');
//   return new Blob([data.buffer], { type: 'video/mp4' });
// }


// // Module '"@ffmpeg/ffmpeg"' has no exported member 'createFFmpeg'.ts(2305)
