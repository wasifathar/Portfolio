# How to Get Lanyard Assets

## Quick Setup Instructions

The Lanyard 3D effect requires two asset files. Here's how to get them:

### Option 1: Download from GitHub (Recommended)

1. Go to: https://github.com/reactbits/reactbits/tree/main/packages/default/src/components/Lanyard
2. Look for the `assets` folder or check the component files
3. Download:
   - `card.glb` - The 3D model file
   - `lanyard.png` - The texture for the lanyard band

### Option 2: Use the ReactBits Repo

1. Visit: https://reactbits.dev/default/Components/Lanyard
2. Check the component source code or assets section
3. Download the required files

### Option 3: Create Placeholder Files (For Testing)

If you want to test the component structure, you can create minimal placeholder files:

**card.glb**: This is a binary GLB file - you'll need to download the actual file
**lanyard.png**: A simple white/transparent PNG texture (can be created in any image editor)

## Where to Place Files

Once you have the files, place them in:

```
public/
  ├── card.glb
  └── lanyard.png
```

## After Adding Files

1. Restart your dev server
2. The Lanyard 3D effect should appear automatically
3. Each core competency icon will have a 3D animated lanyard card

## Current Status

✅ Component code is ready
✅ Error handling is in place  
✅ Icon fallbacks are showing
❌ Asset files are missing (need to be added)

Once you add the files, the 3D Lanyard effect will automatically work!



