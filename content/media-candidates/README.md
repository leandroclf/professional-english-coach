# Candidate lesson media

Files in this directory are authoring candidates only. The generated MP3 is deliberately ignored by Git while its rights and human review are pending, and `scripts/build-static.mjs` does not copy this directory into the learner-facing site. Generate the local preview with `bash scripts/generate-audio-candidate.sh`. Promote an asset only after checking the final rendered clip by ear, checking every word against the approved script, verifying redistribution terms for the tool/model/voice, and recording reviewer and approval in the media manifest and `src/media-assets.js`.

`tradeoff-phrase.mp3` is a short English TTS candidate generated locally by FFmpeg using its libflite `kal` voice. It uses no reference recording or cloned identity. Its pronunciation, transcript, and redistribution terms have not been approved yet; do not publish it while the manifest says `pending-human-review`.

To inspect a candidate in Google Colab, first generate it locally, then open [`notebooks/lesson_media_review.ipynb`](../../notebooks/lesson_media_review.ipynb), upload only authored lesson media, inspect the audio metadata, listen to the clip, complete the human checklist, and export the resulting manifest. Do not upload learner recordings, secrets, or confidential source material.
