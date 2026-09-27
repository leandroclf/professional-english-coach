import { access, cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { mediaAssets } from '../src/media-assets.js';
import { units } from '../src/curriculum.js';

for (const unit of units) {
  if (!unit.example || !unit.meaning) throw new Error(`Missing text alternative for ${unit.id}`);
  await access(resolve('src/assets/audio', `${unit.id}.mp3`));
}
await access(resolve('src/assets/video/introductions.mp4'));
await access(resolve('src/assets/video/introductions.vtt'));

for (const [assetId, asset] of Object.entries(mediaAssets)) {
  if (asset.status === 'enabled') {
    try { await access(resolve('src', asset.filePath)); }
    catch { throw new Error(`Approved media asset "${assetId}" is missing from src/.`); }
    if ((asset.type === 'audio' && !asset.transcript) || (asset.type === 'video' && !asset.captionsSrc && !asset.transcript)) {
      throw new Error(`Enabled media asset "${assetId}" is missing its required transcript or captions.`);
    }
  }
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
