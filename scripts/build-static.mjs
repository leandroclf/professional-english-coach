import { access, cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { mediaAssets } from '../src/media-assets.js';

for (const [assetId, asset] of Object.entries(mediaAssets)) {
  if (asset.status === 'approved') {
    try { await access(resolve('src', asset.filePath)); }
    catch { throw new Error(`Approved media asset "${assetId}" is missing from src/.`); }
    if (asset.humanReview !== 'approved' || asset.rightsReview !== 'approved') {
      throw new Error(`Approved media asset "${assetId}" is missing required human or rights approval.`);
    }
    if ((asset.type === 'audio' && !asset.transcript) || (asset.type === 'video' && !asset.captionsSrc && !asset.transcript)) {
      throw new Error(`Approved media asset "${assetId}" is missing its required transcript or captions.`);
    }
  }
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
