#!/usr/bin/env bash
set -euo pipefail

if ! ffmpeg -hide_banner -filters 2>/dev/null | grep -q 'flite'; then
  echo "This FFmpeg build does not include the libflite filter." >&2
  exit 1
fi

mkdir -p content/media-candidates
ffmpeg -hide_banner -y \
  -f lavfi \
  -i "flite=textfile=content/media-candidates/tradeoff-phrase.txt:voice=kal" \
  -ac 1 -ar 22050 -c:a libmp3lame -b:a 48k \
  -metadata title="Trade-off listening cloze candidate" \
  -metadata language=eng \
  content/media-candidates/tradeoff-phrase.mp3

echo "Locally generated sample saved under content/media-candidates. Compare its script, duration and size before replacing the learner-facing asset."
