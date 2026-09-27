import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { units } from '../src/curriculum.js';

await mkdir('content/learning-media', { recursive: true });
await mkdir('src/assets/audio', { recursive: true });
await mkdir('src/assets/video', { recursive: true });
function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.error?.message || 'FFmpeg failed');
}
for (const unit of units) {
  const path = `content/learning-media/${unit.id}.txt`;
  await writeFile(path, unit.example + '\n');
  ffmpeg(['-f', 'lavfi', '-i', `flite=textfile=${path}:voice=kal`, '-ac', '1', '-ar', '22050', '-c:a', 'libmp3lame', '-b:a', '48k', `src/assets/audio/${unit.id}.mp3`]);
}
// An original two-part visual explanation, narrated by the same synthetic voice.
ffmpeg(['-f', 'lavfi', '-i', 'color=c=0x173a46:s=960x540:r=24:d=9', '-i', 'src/assets/audio/introductions.mp3', '-vf', "drawtext=text='INTRODUCE YOURSELF':fontcolor=0xb5e1cc:fontsize=28:x=60:y=60,drawtext=text='1. Name or role':fontcolor=white:fontsize=32:x=60:y=160,drawtext=text='I am Alex.':fontcolor=white:fontsize=40:x=60:y=215,drawtext=text='2. Current work':fontcolor=white:fontsize=32:x=60:y=320:enable='gte(t,2)',drawtext=text='I work on the payments team.':fontcolor=white:fontsize=38:x=60:y=380:enable='gte(t,2)'", '-af', 'adelay=1000|1000,apad', '-t', '9', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart', 'src/assets/video/introductions.mp4']);
await writeFile('src/assets/video/introductions.vtt', 'WEBVTT\n\n00:00.000 --> 00:02.000\nI am Alex.\n\n00:02.000 --> 00:09.000\nI work on the payments team.\n');
await writeFile('content/learning-media/manifest.json', JSON.stringify({ generatedWith: 'FFmpeg / libflite kal', voiceCloning: false, ownerAuthorization: 'personal-and-family-use; existing-public-hosting-accepted', rightsStatus: 'not-independently-reviewed', humanReview: 'waived-by-owner', audio: units.map(unit => ({ id: unit.id, path: `src/assets/audio/${unit.id}.mp3`, transcript: unit.example })), video: { path: 'src/assets/video/introductions.mp4', captions: 'src/assets/video/introductions.vtt', transcript: units[0].example, description: 'Original two-part text explanation: name or role, then current work.' } }, null, 2) + '\n');
console.log(`Generated ${units.length} original audio clips and one captioned video.`);
