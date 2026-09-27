// Only assets with confirmed human review and redistribution rights may be enabled.
export const mediaAssets = Object.freeze({
  'tradeoff-phrase': Object.freeze({
    type: 'audio',
    status: 'pending-human-review',
    src: './src/assets/audio/tradeoff-phrase.mp3',
    filePath: 'assets/audio/tradeoff-phrase.mp3',
    contentType: 'audio/mpeg',
    language: 'en-US',
    transcript: 'The main trade-off is higher latency in exchange for better isolation.',
    candidatePath: '../content/media-candidates/tradeoff-phrase.mp3',
    provenance: 'Generated locally with FFmpeg 6.1.1 / libflite voice kal; no reference recording.',
    rightsReview: 'pending',
    humanReview: 'pending'
  })
});

export function isMediaAssetApproved(assetId) {
  const asset = mediaAssets[assetId];
  const hasTextAlternative = asset?.type === 'audio'
    ? Boolean(asset.transcript)
    : asset?.type === 'video'
      ? Boolean(asset.captionsSrc || asset.transcript)
      : false;
  return asset?.status === 'approved' && asset.humanReview === 'approved' && asset.rightsReview === 'approved' && hasTextAlternative;
}
