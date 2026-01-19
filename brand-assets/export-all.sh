#!/bin/bash

# POLARITY LAB - Export All Social Media Assets to PNG
# Run this script from the brand-assets folder

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR="./exports"

# Create exports folder
mkdir -p "$OUTPUT_DIR"

echo "Exporting POLARITY LAB social media assets..."

# LinkedIn
echo "→ LinkedIn Banner (1584x396)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/linkedin-banner-1584x396.png" \
  --window-size=1584,396 \
  "file://$(pwd)/social-media/linkedin/linkedin-banner-1584x396.html" 2>/dev/null

echo "→ LinkedIn Profile (400x400)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/linkedin-profile-400x400.png" \
  --window-size=400,400 \
  "file://$(pwd)/social-media/linkedin/linkedin-profile-400x400.html" 2>/dev/null

# Instagram
echo "→ Instagram Post (1080x1080)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/instagram-post-1080x1080.png" \
  --window-size=1080,1080 \
  "file://$(pwd)/social-media/instagram/instagram-post-1080x1080.html" 2>/dev/null

echo "→ Instagram Story (1080x1920)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/instagram-story-1080x1920.png" \
  --window-size=1080,1920 \
  "file://$(pwd)/social-media/instagram/instagram-story-1080x1920.html" 2>/dev/null

# Twitter/X
echo "→ Twitter Banner (1500x500)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/twitter-banner-1500x500.png" \
  --window-size=1500,500 \
  "file://$(pwd)/social-media/twitter/twitter-banner-1500x500.html" 2>/dev/null

echo "→ Twitter Profile (400x400)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/twitter-profile-400x400.png" \
  --window-size=400,400 \
  "file://$(pwd)/social-media/twitter/twitter-profile-400x400.html" 2>/dev/null

# Facebook
echo "→ Facebook Cover (820x312)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/facebook-cover-820x312.png" \
  --window-size=820,312 \
  "file://$(pwd)/social-media/facebook/facebook-cover-820x312.html" 2>/dev/null

# YouTube
echo "→ YouTube Banner (2560x1440)"
"$CHROME" --headless --screenshot="$OUTPUT_DIR/youtube-banner-2560x1440.png" \
  --window-size=2560,1440 \
  "file://$(pwd)/social-media/youtube/youtube-banner-2560x1440.html" 2>/dev/null

echo ""
echo "✓ All assets exported to: $OUTPUT_DIR/"
echo ""
ls -la "$OUTPUT_DIR/"
