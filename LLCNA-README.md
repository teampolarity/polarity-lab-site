# LLCNA - Polarity LLC New Aesthetic

## Design System v1.0

A premium, Apple-inspired design system with Polarity brand colors (Red/Coral + Teal).

---

## Brand Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary Red | `#FF6B81` | `rgba(255, 107, 129)` | Accents, CTAs, left wall glow |
| Primary Teal | `#4ECDC4` | `rgba(78, 205, 196)` | Accents, active states, right wall glow |
| Dark Text | `#1d1d1f` | - | Headings, body text (light mode) |
| Light Text | `#f5f5f7` | - | Headings, body text (dark mode) |
| Muted Text | `#515154` | - | Subtitles |
| Caption Text | `#86868b` | - | Captions, descriptions |

---

## Core Components

### 1. Glassmorphism Cards
```html
<div class="llcna-card">
  <!-- Card content -->
</div>

<!-- With color accent on hover -->
<div class="llcna-card accent-teal">...</div>
<div class="llcna-card accent-red">...</div>
<div class="llcna-card accent-purple">...</div>
```

### 2. Buttons
```html
<button class="llcna-btn llcna-btn-primary">Primary Action</button>
<button class="llcna-btn llcna-btn-secondary">Secondary Action</button>
```

### 3. Dropdown Menu
```html
<div class="llcna-dropdown">
  <a href="#">Home</a>
  <a href="#">Projects</a>
  <a href="#">About</a>
</div>
```

### 4. Toggle Buttons
```html
<button class="llcna-toggle">
  <svg>...</svg>
</button>
```

### 5. Navigation Arrows
```html
<button class="llcna-nav-arrow left">←</button>
<button class="llcna-nav-arrow right">→</button>
```

### 6. Slide Indicators
```html
<div class="llcna-indicators">
  <div class="llcna-dot active" data-label="Home"></div>
  <div class="llcna-dot" data-label="About"></div>
  <div class="llcna-dot" data-label="Contact"></div>
</div>
```

---

## Background Layers

### Required HTML Structure
```html
<body>
  <!-- Atmosphere layer (animated color washes) -->
  <div class="llcna-atmosphere"></div>
  
  <!-- Wall glows -->
  <div class="llcna-wall-glow left"></div>
  <div class="llcna-wall-glow right"></div>
  
  <!-- Particles canvas (optional) -->
  <canvas id="particles-canvas"></canvas>
  
  <!-- Your content -->
  <main>...</main>
</body>
```

---

## Typography

```html
<h1 class="llcna-heading-xl">Extra Large Heading</h1>
<h2 class="llcna-heading-lg">Large Heading</h2>
<h3 class="llcna-heading-md">Medium Heading</h3>
<p class="llcna-subtitle">Subtitle text</p>
<p class="llcna-body">Body text</p>
<span class="llcna-caption">Caption text</span>
```

### Gradient Text
```html
<span class="llcna-gradient-text-teal">Teal gradient</span>
<span class="llcna-gradient-text-red">Red gradient</span>
<span class="llcna-gradient-text-mixed">Red to Teal gradient</span>
```

---

## Animations

```html
<!-- Fade in animation -->
<div class="llcna-animate-fade-in">...</div>

<!-- Pulsing glow animation -->
<div class="llcna-animate-glow">...</div>
```

---

## Dark Mode

Add `dark-mode` class to body to enable:
```javascript
document.body.classList.toggle('dark-mode');
```

All components automatically adapt to dark mode.

---

## Files

| File | Description |
|------|-------------|
| `LLCNA-styles.css` | Core CSS styles |
| `LLCNA-particles.js` | Particle physics system |
| `LLCNA-README.md` | This documentation |

---

## Usage

1. Include the CSS file:
```html
<link rel="stylesheet" href="LLCNA-styles.css">
```

2. Add the background layers to your HTML body

3. Include the particles script (optional):
```html
<script src="LLCNA-particles.js"></script>
```

4. Apply classes to your elements

---

## Design Principles

1. **Glassmorphism** - Frosted glass effects with blur
2. **Brand Color Tinting** - Subtle red/teal washes throughout
3. **Smooth Animations** - Cubic-bezier easing for premium feel
4. **Apple-level Polish** - Attention to shadows, borders, spacing
5. **Accessibility** - Dark mode support, readable contrast

---

*Created for Polarity LLC - Psychoradiology Lab studying Conversational Connectomics (CCX)*
