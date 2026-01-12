# Ball Dropping Physics - Setup Guide

## 📦 Complete Package for Copy/Paste

### What You Need to Copy

1. **HTML Canvas Element**
2. **CSS Styling**
3. **JavaScript Physics Engine**

---

## 🎯 Step-by-Step Integration

### Step 1: Add HTML Canvas

Add this canvas element anywhere in your HTML body (preferably near the end before `</body>`):

```html
<canvas id="particles-canvas"></canvas>
```

---

### Step 2: Add CSS Styling

Add this CSS to your stylesheet or `<style>` tag:

```css
/* Ambient particles canvas */
#particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;  /* Adjust based on your layout */
  opacity: 1;
}
```

**⚠️ Important:** Adjust `z-index` based on your page structure:
- Use `z-index: 1` to place behind most content
- Use higher values to place in front of background but behind text
- Use `z-index: 9999` to place on top of everything

---

### Step 3: Add JavaScript

**Option A: Using the standalone file**
```html
<script src="ball-physics-standalone.js"></script>
```

**Option B: Inline in your HTML**
Copy the entire contents of `ball-physics-standalone.js` and paste it in a `<script>` tag before `</body>`.

---

## 🎨 Customization Options

### Change Particle Count

```javascript
// Line 19-20 in ball-physics-standalone.js
const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 25 : 50;  // Change these numbers
```

### Adjust Gravity Strength

```javascript
// Line 21
const GRAVITY = 0.08;  // Higher = falls faster (try 0.1 - 0.15)
```

### Change Particle Colors

```javascript
// Lines 67-74 - Modify the colors array
getRandomColor() {
  const colors = [
    { r: 78, g: 205, b: 196 },   // Teal - CHANGE THESE RGB VALUES
    { r: 187, g: 143, b: 206 },  // Purple
    { r: 255, g: 160, b: 122 },  // Coral
    // Add more colors or remove some
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
```

### Adjust Particle Size

```javascript
// Line 40
this.radius = Math.random() * 3.5 + 1.8;  // Range: 1.8 to 5.3px
// Change to: Math.random() * 5 + 2;  for 2-7px range
```

### Mouse Interaction Radius

```javascript
// Line 22-23
const MOUSE_RADIUS = 150;  // How far away mouse affects particles
const MOUSE_FORCE = 0.6;   // How strong the push is
```

---

## 🎭 Dark Mode Support

The system automatically detects dark mode via this class:

```javascript
const isDarkMode = document.body.classList.contains('dark-mode');
```

**If your dark mode uses a different class:**
```javascript
// Change line 266 to match your dark mode class
const isDarkMode = document.body.classList.contains('your-dark-class');
// OR use data attributes:
const isDarkMode = document.body.dataset.theme === 'dark';
```

---

## ⚙️ Physics Configuration

All configurable constants at the top of the file:

```javascript
const PARTICLE_COUNT = isMobile ? 25 : 50;  // Total particles
const GRAVITY = 0.08;                        // Fall speed
const MOUSE_RADIUS = 150;                    // Mouse interaction distance
const MOUSE_FORCE = 0.6;                     // Mouse push strength
```

Particle characteristics (inside Particle class):
```javascript
this.bounce = Math.random() * 0.2 + 0.65;      // 0.65-0.85 bounciness
this.friction = Math.random() * 0.015 + 0.98;  // 0.98-0.995 air friction
this.floorFriction = Math.random() * 0.08 + 0.88; // 0.88-0.96 floor friction
this.radius = Math.random() * 3.5 + 1.8;       // 1.8-5.3px size
this.opacity = Math.random() * 0.3 + 0.3;      // 0.3-0.6 transparency
```

---

## 🚀 Features Included

### ✅ Physics
- Realistic gravity and falling motion
- Bouncing off floor, walls, and ceiling
- Unique physics properties per particle (bounce, friction, etc.)
- Smooth motion with delta time compensation

### ✅ Visual Effects
- Soft glow around particles
- Impact flash on collision
- Fade-in effect when spawning
- Highlight reflection on larger particles
- Particle-to-particle connection lines

### ✅ Interactivity
- Mouse/touch repulsion (particles avoid cursor)
- Scroll physics (particles react to page scroll)
- Responsive particle count (fewer on mobile)
- Auto-resize on window resize

### ✅ Performance
- 60 FPS target
- Hardware-accelerated canvas
- Efficient collision detection
- Delta time smoothing

---

## 📱 Mobile Optimization

Automatically reduces particle count on mobile:
- Desktop: 50 particles
- Mobile (< 768px): 25 particles

To disable or adjust:
```javascript
// Change line 19-20
const PARTICLE_COUNT = 50;  // Fixed count for all devices
```

---

## 🐛 Troubleshooting

### Particles not showing
1. Check if canvas element exists in HTML
2. Verify `z-index` isn't behind opaque backgrounds
3. Check browser console for errors
4. Ensure script runs after DOM loads

### Too many/few particles
```javascript
const PARTICLE_COUNT = isMobile ? 30 : 60;  // Adjust these
```

### Particles too fast/slow
```javascript
const GRAVITY = 0.12;  // Increase for faster falling
```

### Dark mode not working
Update the dark mode detection (line 266):
```javascript
const isDarkMode = document.documentElement.classList.contains('dark');
```

---

## 📄 File Structure

```
your-project/
├── index.html                      # Your HTML file
├── styles.css                      # Your CSS (add canvas styles here)
└── ball-physics-standalone.js      # The physics engine
```

---

## 🎨 Example Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Project</title>
  <style>
    /* Canvas styling */
    #particles-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 1;
    }
    
    /* Your other styles */
    body {
      margin: 0;
      background: #f5f5f7;
    }
  </style>
</head>
<body>
  
  <!-- Your content here -->
  <h1>My Website</h1>
  
  <!-- Particle canvas -->
  <canvas id="particles-canvas"></canvas>
  
  <!-- Physics engine -->
  <script src="ball-physics-standalone.js"></script>
</body>
</html>
```

---

## 💡 Pro Tips

1. **Layer Behind Text:** Use `z-index: 1` and give text elements `z-index: 10`
2. **Subtle Effect:** Reduce `PARTICLE_COUNT` to 20-30 for less visual noise
3. **Faster Action:** Increase `GRAVITY` to 0.12-0.15
4. **Brand Colors:** Update the color array with your brand colors
5. **Performance:** On low-end devices, set fixed `PARTICLE_COUNT = 20`

---

## 📊 Dependencies

**None!** This is pure vanilla JavaScript with no external libraries needed.

- Uses native Canvas API
- Native JavaScript classes
- No jQuery, no frameworks
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)

---

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Quick Start Checklist

- [ ] Copy `ball-physics-standalone.js` to your project
- [ ] Add `<canvas id="particles-canvas"></canvas>` to HTML
- [ ] Add canvas CSS styling
- [ ] Include script: `<script src="ball-physics-standalone.js"></script>`
- [ ] Adjust `z-index` for proper layering
- [ ] Customize colors (optional)
- [ ] Test on mobile and desktop
- [ ] Adjust particle count if needed

---

**You're done! The balls should now be dropping and bouncing on your page!** 🎉
