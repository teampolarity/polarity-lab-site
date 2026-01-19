# POLARITY LAB — Brand Guidelines

## Company Information

**Company Name:** POLARITY LAB LLC  
**Tagline:** Research Lab · Conversational Connectomics  
**Location:** Providence, RI  
**Website:** polarity-lab.com  
**Email:** polarity@polarity-lab.com

---

## Brand Colors

### Primary Colors

| Color Name | HEX | RGB | Usage |
|------------|-----|-----|-------|
| **Polarity Red** | `#FF4466` | 255, 68, 102 | Primary brand color, logo strokes |
| **Deep Crimson** | `#CC2244` | 204, 34, 68 | Darker accent, sphere gradient |
| **Dark Crimson** | `#991133` | 153, 17, 51 | Deep shadows |

### Secondary Colors

| Color Name | HEX | RGB | Usage |
|------------|-----|-----|-------|
| **Teal** | `#4ECDC4` | 78, 205, 196 | Accent, highlights |
| **Purple** | `#BB8FCE` | 187, 143, 206 | Secondary accent |
| **Coral** | `#FFA07A` | 255, 160, 122 | Warm accent |

### Background Colors

| Mode | Color | HEX |
|------|-------|-----|
| Light Mode | Off-White | `#F5F5F7` |
| Dark Mode | Near Black | `#0A0A0A` |
| Dark Mode Secondary | Deep Blue | `#1A1A2E` |

---

## Typography

### Primary Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Font Weights
- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

### Letter Spacing
- Headlines: `0.15em - 0.25em` (uppercase)
- Body: `-0.01em`
- Taglines: `0.1em - 0.15em`

---

## Logo Specifications

### Logo Construction

The POLARITY wordmark features:
- **Letterforms:** Custom geometric construction with rounded endpoints
- **Connection Nodes:** Gradient spheres at letter joints
- **The "O":** Iconic sphere with orbital rings and polar beams

### Logo Variants

| File | Description | Use Case |
|------|-------------|----------|
| `polarity-logo-primary.svg` | Full wordmark with all effects | Hero sections, large displays |
| `polarity-icon-only.svg` | Just the "O" sphere icon | App icons, favicons, small spaces |

### Clear Space
- Minimum clear space around logo: **1x height of the "O" sphere**

### Minimum Size
- Full wordmark: **200px width minimum**
- Icon only: **32px minimum**

---

## Social Media Specifications

### LinkedIn

| Asset | Dimensions | File |
|-------|------------|------|
| Banner | 1584 × 396 px | `linkedin/linkedin-banner-1584x396.html` |
| Profile | 400 × 400 px | `linkedin/linkedin-profile-400x400.html` |

**Notes:**
- Profile photo displays as circle
- Banner safe area: center 1400px for mobile

### Instagram

| Asset | Dimensions | File |
|-------|------------|------|
| Post (Square) | 1080 × 1080 px | `instagram/instagram-post-1080x1080.html` |
| Story | 1080 × 1920 px | `instagram/instagram-story-1080x1920.html` |

**Notes:**
- Story safe zones: top/bottom 250px for UI
- Use dark mode version for better contrast

### Twitter / X

| Asset | Dimensions | File |
|-------|------------|------|
| Banner | 1500 × 500 px | `twitter/twitter-banner-1500x500.html` |
| Profile | 400 × 400 px | `twitter/twitter-profile-400x400.html` |

**Notes:**
- Left side of banner may be covered by profile photo
- Banner center is safe for important content

### Facebook

| Asset | Dimensions | File |
|-------|------------|------|
| Cover | 820 × 312 px | `facebook/facebook-cover-820x312.html` |

**Notes:**
- Mobile crops to 640 × 360 (center)
- Profile photo overlaps bottom-left on desktop

### YouTube

| Asset | Dimensions | File |
|-------|------------|------|
| Banner | 2560 × 1440 px | `youtube/youtube-banner-2560x1440.html` |

**Notes:**
- Safe area for all devices: 1546 × 423 px (centered)
- TV displays full banner
- Mobile shows only center portion

---

## How to Export Images

The social media assets are provided as HTML files for maximum quality and flexibility.

### Method 1: Browser Screenshot (Quick)

1. Open the HTML file in Chrome/Safari
2. Right-click → Inspect → Toggle Device Toolbar
3. Set exact dimensions (e.g., 1584 × 396 for LinkedIn)
4. Screenshot the viewport (Cmd+Shift+4 on Mac)

### Method 2: Using Chrome DevTools (Best Quality)

1. Open HTML file in Chrome
2. Right-click → Inspect
3. Press Cmd+Shift+P → type "screenshot"
4. Select "Capture full size screenshot"

### Method 3: Convert to PNG (Automated)

```bash
# Install Chrome headless
# Navigate to brand-assets folder

# LinkedIn Banner
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --screenshot=linkedin-banner.png \
  --window-size=1584,396 \
  "file://$(pwd)/social-media/linkedin/linkedin-banner-1584x396.html"

# Instagram Post  
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --screenshot=instagram-post.png \
  --window-size=1080,1080 \
  "file://$(pwd)/social-media/instagram/instagram-post-1080x1080.html"
```

---

## Bio Templates

### Short Bio (160 characters)
```
POLARITY LAB — Research laboratory studying Conversational Connectomics. Extracting cognitive signals from natural language. Providence, RI.
```

### Medium Bio (300 characters)
```
POLARITY LAB is a research laboratory pioneering Conversational Connectomics (CCX) — the science of extracting cognitive signals from natural language. We build knowledge graphs from conversation, creating memory systems that understand context. 2 provisional patents filed. Providence, RI.
```

### Full Bio
```
POLARITY LAB LLC is a research laboratory based in Providence, Rhode Island, specializing in Conversational Connectomics (CCX). Our work focuses on extracting cognitive signals from natural language to build intelligent systems that truly understand human communication.

Our flagship project, Polarity, is a cognitive memory service — a friend who never forgets. By creating knowledge graphs from conversation, we're building the future of contextual AI understanding.

With 2 provisional patents filed, we're at the forefront of conversation intelligence research.
```

---

## Hashtags

### Primary
```
#PolarityLab #ConversationalConnectomics #CCX
```

### Topic Tags
```
#AI #ResearchLab #NLP #KnowledgeGraphs #CognitiveScience #Providence
```

---

## Contact Information

- **Website:** polarity-lab.com
- **Email:** polarity@polarity-lab.com
- **Location:** Providence, RI

---

## File Checklist

### Logos
- [ ] `logos/polarity-logo-primary.svg` — Full wordmark
- [ ] `logos/polarity-icon-only.svg` — Icon only

### Social Media
- [ ] `linkedin/linkedin-banner-1584x396.html`
- [ ] `linkedin/linkedin-profile-400x400.html`
- [ ] `instagram/instagram-post-1080x1080.html`
- [ ] `instagram/instagram-story-1080x1920.html`
- [ ] `twitter/twitter-banner-1500x500.html`
- [ ] `twitter/twitter-profile-400x400.html`
- [ ] `facebook/facebook-cover-820x312.html`
- [ ] `youtube/youtube-banner-2560x1440.html`

---

## Quick Reference Card

| Platform | Profile Size | Banner Size |
|----------|--------------|-------------|
| LinkedIn | 400×400 | 1584×396 |
| Instagram | 320×320 | 1080×1920 (story) |
| Twitter/X | 400×400 | 1500×500 |
| Facebook | 180×180 | 820×312 |
| YouTube | 800×800 | 2560×1440 |

---

*POLARITY LAB LLC © 2025*
*2 Provisional Patents Filed*
