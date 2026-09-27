// Asset records distinguish owner-authorized use from independently verified rights.
export const mediaAssets = Object.freeze({
  'tradeoff-phrase': Object.freeze({
    type: 'audio',
    status: 'enabled',
    src: './src/assets/audio/tradeoff-phrase.mp3',
    filePath: 'assets/audio/tradeoff-phrase.mp3',
    contentType: 'audio/mpeg',
    language: 'en-US',
    transcript: 'The main trade-off is higher latency in exchange for better isolation.',
    candidatePath: '../content/media-candidates/tradeoff-phrase.mp3',
    provenance: 'Locally synthesized with FFmpeg 6.1.1 / libflite voice kal; no reference recording.',
    rightsStatus: 'not-independently-reviewed',
    ownerAuthorization: 'personal-and-family-use; public-hosting-risk-accepted',
    humanReview: 'waived-by-owner'
  })
});

export function isMediaAssetEnabled(assetId) {
  const asset = mediaAssets[assetId];
  const hasTextAlternative = asset?.type === 'audio'
    ? Boolean(asset.transcript)
    : asset?.type === 'video'
      ? Boolean(asset.captionsSrc || asset.transcript)
      : false;
  return asset?.status === 'enabled' && Boolean(asset.ownerAuthorization) && hasTextAlternative;
}
