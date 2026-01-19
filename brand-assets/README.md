# POLARITY LAB — Brand Assets

High-quality logo and social media assets for POLARITY LAB.

## Quick Start

1. **Logos** are in SVG format — scalable to any size
2. **Social media assets** are HTML files — open in browser and screenshot at exact dimensions
3. **Brand guidelines** in `BRAND-GUIDELINES.md` — colors, fonts, specs

## Folder Structure

```
brand-assets/
├── logos/
│   ├── polarity-logo-primary.svg    # Full wordmark
│   └── polarity-icon-only.svg       # Icon only (the O sphere)
│
├── social-media/
│   ├── linkedin/
│   │   ├── linkedin-banner-1584x396.html
│   │   └── linkedin-profile-400x400.html
│   │
│   ├── instagram/
│   │   ├── instagram-post-1080x1080.html
│   │   └── instagram-story-1080x1920.html
│   │
│   ├── twitter/
│   │   ├── twitter-banner-1500x500.html
│   │   └── twitter-profile-400x400.html
│   │
│   ├── facebook/
│   │   └── facebook-cover-820x312.html
│   │
│   └── youtube/
│       └── youtube-banner-2560x1440.html
│
├── BRAND-GUIDELINES.md              # Full brand specs
└── README.md                        # This file
```

## Exporting to PNG/JPG

### Quick Method (Mac)

1. Open any `.html` file in Safari or Chrome
2. Press `Cmd + Shift + 4` to screenshot
3. Drag to select the exact area

### High-Quality Method (Chrome)

1. Open HTML file in Chrome
2. Right-click → Inspect (or `Cmd + Option + I`)
3. Press `Cmd + Shift + P`
4. Type "screenshot" and select **"Capture full size screenshot"**
5. PNG will download automatically

### Automated Export Script

Run this in Terminal to export all banners:

```bash
cd brand-assets

# LinkedIn Banner
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="linkedin-banner.png" \
  --window-size=1584,396 \
  "file://$(pwd)/social-media/linkedin/linkedin-banner-1584x396.html"

# LinkedIn Profile
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="linkedin-profile.png" \
  --window-size=400,400 \
  "file://$(pwd)/social-media/linkedin/linkedin-profile-400x400.html"

# Instagram Post
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="instagram-post.png" \
  --window-size=1080,1080 \
  "file://$(pwd)/social-media/instagram/instagram-post-1080x1080.html"

# Instagram Story
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="instagram-story.png" \
  --window-size=1080,1920 \
  "file://$(pwd)/social-media/instagram/instagram-story-1080x1920.html"

# Twitter Banner
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="twitter-banner.png" \
  --window-size=1500,500 \
  "file://$(pwd)/social-media/twitter/twitter-banner-1500x500.html"

# Twitter Profile
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="twitter-profile.png" \
  --window-size=400,400 \
  "file://$(pwd)/social-media/twitter/twitter-profile-400x400.html"

# Facebook Cover
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="facebook-cover.png" \
  --window-size=820,312 \
  "file://$(pwd)/social-media/facebook/facebook-cover-820x312.html"

# YouTube Banner
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot="youtube-banner.png" \
  --window-size=2560,1440 \
  "file://$(pwd)/social-media/youtube/youtube-banner-2560x1440.html"
```

## Size Reference

| Platform | Profile | Banner/Cover |
|----------|---------|--------------|
| LinkedIn | 400×400 | 1584×396 |
| Instagram | — | 1080×1080 (post) / 1080×1920 (story) |
| Twitter/X | 400×400 | 1500×500 |
| Facebook | 180×180 | 820×312 |
| YouTube | 800×800 | 2560×1440 |

## Brand Colors

- **Primary:** `#FF4466` (Polarity Red)
- **Secondary:** `#CC2244` (Deep Crimson)
- **Accent:** `#4ECDC4` (Teal)

---

*POLARITY LAB LLC · Providence, RI*
