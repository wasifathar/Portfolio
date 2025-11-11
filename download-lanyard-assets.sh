#!/bin/bash
# Script to download Lanyard assets
# Run this from the project root: bash download-lanyard-assets.sh

echo "Downloading Lanyard assets..."

# Try multiple possible GitHub paths
PATHS=(
  "packages/default/src/components/Lanyard/assets"
  "packages/default/src/components/Lanyard"
  "src/components/Lanyard/assets"
  "components/Lanyard/assets"
)

for path in "${PATHS[@]}"; do
  echo "Trying: $path"
  curl -L "https://raw.githubusercontent.com/reactbits/reactbits/main/$path/card.glb" -o public/card.glb 2>/dev/null
  if file public/card.glb | grep -q "GLB\|data\|binary"; then
    echo "✓ card.glb downloaded successfully"
    break
  else
    rm -f public/card.glb
  fi
done

for path in "${PATHS[@]}"; do
  echo "Trying: $path"
  curl -L "https://raw.githubusercontent.com/reactbits/reactbits/main/$path/lanyard.png" -o public/lanyard.png 2>/dev/null
  if file public/lanyard.png | grep -q "PNG\|image"; then
    echo "✓ lanyard.png downloaded successfully"
    break
  else
    rm -f public/lanyard.png
  fi
done

echo ""
echo "If downloads failed, please manually download from:"
echo "https://reactbits.dev/default/Components/Lanyard"
echo ""
echo "Place files in: public/card.glb and public/lanyard.png"



