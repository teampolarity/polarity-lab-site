# Real Smoke Machine Implementation

## Complete Redesign: From Glitter to Real Smoke

### The Problem
The previous implementation looked like glitter or sparkles - too sharp, too visible, with hard edges and complex physics that didn't match real smoke behavior.

### The Solution: Floor Fog Machine

Redesigned to simulate a **real floor smoke machine** blowing fog upward through the text.

---

## New Smoke Characteristics

### 1. **Visual Appearance**
- ✅ **Soft and fluid** - no hard edges
- ✅ **Very transparent** (5-15% opacity base)
- ✅ **Large particles** (150-350px) that blend together
- ✅ **Smooth gradients** with 6 color stops for soft falloff
- ✅ **Screen blend mode** for natural layering
- ✅ **Minimal motion blur trail** (2% clear) for fluidity

### 2. **Movement Mechanics**
```
Starting Point: Bottom center of screen (floor)
Movement: Slow upward rise (0.3 - 0.5 units/frame)
Drift: Gentle horizontal sway (0.15 units max)
Turbulence: Very subtle air currents (0.08 magnitude)
Expansion: Gradual size increase as it rises
```

**Real smoke behavior:**
- Rises from floor continuously
- Expands as it moves up (real smoke diffusion)
- Gentle side-to-side drift (air currents)
- Very slow rotation (0.005 rad/frame)
- No bouncing or collision - just fluid rise

### 3. **Continuous Flow**
- **400 particle capacity** for continuous fog
- **8 particles spawn per frame** from floor
- **6-14 second lifespan** per particle
- **Automatic removal** when particles rise off-screen
- Creates **endless fog stream** effect

### 4. **Color & Opacity**
```css
Base Color: rgba(230, 235, 240) - Very light gray
Opacity Range: 0.05 - 0.20 (extremely transparent)
Gradient Stops:
  - 0%: 50% of base opacity
  - 20%: 40% of base opacity
  - 40%: 25% of base opacity
  - 60%: 12% of base opacity
  - 80%: 5% of base opacity
  - 100%: 0% (invisible)
```

**Why this works:**
- Individual particles are almost invisible
- Multiple overlapping particles create visible fog
- Natural blending like real smoke
- No harsh edges or glitter effect

### 5. **Mouse Interaction**
- **150px clear radius** around cursor
- **Gentle push force** (1.2 magnitude)
- Particles disperse naturally when cursor moves through
- Mouse position resets after 1 second of no movement
- Creates natural "parting" effect like moving through real fog

### 6. **Canvas Settings**
```javascript
Clear amount: 0.02 (2% per frame)
Blend mode: 'screen'
Particle count: 400 max
Spawn rate: 8 per frame
Canvas z-index: 5 (behind text)
```

The very slow clear rate creates natural trailing and blending.

---

## Key Differences from Previous Version

| Old (Glitter-like) | New (Real Smoke) |
|-------------------|------------------|
| 150 particles | 400 particles |
| 40-100px size | 150-350px size |
| High opacity (25-60%) | Low opacity (5-20%) |
| Complex floor physics | Simple upward rise |
| Floor collision & bounce | No collision, continuous flow |
| Sharp gradients (4 stops) | Soft gradients (6 stops) |
| Normal blend mode | Screen blend mode |
| 5% frame clear | 2% frame clear |
| Spawns in middle | Spawns from floor |
| Gravity downward | Rises upward |
| Hard edges | Extremely soft edges |

---

## Technical Implementation

### Particle Lifecycle
```
1. SPAWN at floor center (y = height + 50)
2. RISE slowly upward with gentle drift
3. EXPAND gradually in size
4. FADE as life decreases
5. REMOVE when off-screen or life = 0
```

### Physics Constants
```javascript
PARTICLE_COUNT: 400
SPAWN_RATE: 8 per frame
SMOKE_RISE_SPEED: 0.3 - 0.5
HORIZONTAL_DRIFT: 0.15
TURBULENCE: 0.08 (very subtle)
MOUSE_CLEAR_RADIUS: 150px
MOUSE_FORCE: 1.2
EXPANSION_RATE: 0.2 - 0.5 per frame
```

### Rendering
- Uses `globalCompositeOperation = 'screen'` for additive blending
- Multiple overlapping semi-transparent particles
- Very slow canvas clear (2%) creates natural trails
- Soft 6-stop radial gradients
- No depth sorting needed (all particles same plane)

---

## The Result

**It now looks like REAL SMOKE:**
- ✅ Soft, not glittery
- ✅ Fluid, not bouncy
- ✅ Rises from floor like fog machine
- ✅ Flows through/behind text
- ✅ Gentle, not chaotic
- ✅ Transparent, not opaque
- ✅ Continuous flow, not bursts
- ✅ Natural dispersion with cursor
- ✅ Smooth blending, not hard edges

**Smoke Machine Effect Achieved:** 
The continuous spawn from the floor with slow upward drift creates the exact effect of a floor fog machine. The particles are so soft and transparent that they blend together into a cohesive fog layer, not individual visible particles.

---

## Performance

- **Target: 60 FPS**
- 400 particles × 60 FPS = 24,000 calculations/second
- Optimized with:
  - Simple physics (no collision detection)
  - Efficient particle removal
  - Canvas hardware acceleration
  - No depth sorting
  - Minimal per-particle calculations

---

## User Experience

1. **Page loads** → Smoke begins rising from floor
2. **Move cursor** → Smoke parts naturally around it
3. **Scroll down** → Smoke gradually fades out
4. **Return to hero** → Smoke flows back in

**Behind the text:** The z-index (5) places smoke behind text elements (z-index 10), creating perfect layering.

---

## Comparison to Real Smoke

**Real floor fog machine characteristics:**
- ✓ Rises slowly from ground level
- ✓ Expands as it rises (diffusion)
- ✓ Very soft, no defined edges
- ✓ Transparent/translucent
- ✓ Continuous output
- ✓ Disperses with air movement
- ✓ Gradual fade at top

**Our implementation matches all of these.**

---

## Final Notes

This is **real smoke**, not particles. The key was:
1. Making particles **much larger** and **much softer**
2. **Drastically reducing opacity** (5-20% vs 25-60%)
3. **Removing all complex physics** (no collision, bounce, floor)
4. **Simple upward rise** with gentle drift
5. **Continuous spawn** from floor
6. **Screen blend mode** for natural layering
7. **Slower canvas clear** for fluid trails

The result is authentic fog machine smoke that flows naturally through the scene.
