/* ============================================
   LLCNA Particle Physics System
   Polarity LLC New Aesthetic
   ============================================
   
   Features:
   - Balls drop from top
   - Bounce off walls (contained)
   - Settle on floor with realistic physics
   - Gates open when nav buttons clicked
   - Toggle on/off with button
   - 3D shaded balls with glow effects
   
   Usage:
   1. Add canvas: <canvas id="particles-canvas"></canvas>
   2. Add toggle button: <button id="particles-toggle">...</button>
   3. Include this script
   ============================================ */

(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  
  // Particles enabled state (saved to localStorage)
  let particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';
  
  // Toggle button setup
  const particlesToggle = document.getElementById('particles-toggle');
  if (particlesToggle) {
    if (!particlesEnabled) {
      particlesToggle.classList.add('particles-off');
      canvas.style.opacity = '0';
    }
    
    particlesToggle.addEventListener('click', function() {
      particlesEnabled = !particlesEnabled;
      localStorage.setItem('particlesEnabled', particlesEnabled);
      
      if (particlesEnabled) {
        particlesToggle.classList.remove('particles-off');
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '1';
      } else {
        particlesToggle.classList.add('particles-off');
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
      }
    });
  }
  
  // Navigation arrow positions for collision
  const NAV_ARROW_RADIUS = 40;
  let leftArrowX = 52;
  let rightArrowX;
  let arrowY;
  
  // Gate state - walls block particles unless gate is open
  let leftGateOpen = false;
  let rightGateOpen = false;
  let leftGateTimer = 0;
  let rightGateTimer = 0;
  const GATE_OPEN_DURATION = 2500;
  const WALL_MARGIN = 70;
  
  // Global functions to open gates (called by nav buttons)
  window.openLeftGate = function() {
    leftGateOpen = true;
    leftGateTimer = GATE_OPEN_DURATION;
    // Energy burst - shake all particles left and up!
    particles.forEach(p => {
      if (p.spawned) {
        p.vx -= Math.random() * 3 + 2;
        p.vy -= Math.random() * 4 + 2;
        p.impactFlash = 0.5;
      }
    });
  };
  
  window.openRightGate = function() {
    rightGateOpen = true;
    rightGateTimer = GATE_OPEN_DURATION;
    // Energy burst - shake all particles right and up!
    particles.forEach(p => {
      if (p.spawned) {
        p.vx += Math.random() * 3 + 2;
        p.vy -= Math.random() * 4 + 2;
        p.impactFlash = 0.5;
      }
    });
  };
  
  // Responsive particle count
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 24 : 45;
  const WIND = 0.01;
  const GRAVITY = 0.08;
  const MOUSE_RADIUS = 120;
  const MOUSE_FORCE = 0.4;
  const TURBULENCE = 0.02;
  
  class Particle {
    constructor(spawnImmediately = false) {
      this.bounce = Math.random() * 0.15 + 0.8;
      this.friction = Math.random() * 0.015 + 0.98;
      this.wallFriction = Math.random() * 0.08 + 0.88;
      this.radius = Math.random() * 4 + 2.5;
      this.mass = this.radius * this.radius;
      this.windMultiplier = Math.random() * 0.4 + 0.8;
      this.color = this.getRandomColor();
      this.opacity = Math.random() * 0.3 + 0.5;
      this.glowIntensity = Math.random() * 0.3 + 0.4;
      this.impactFlash = 0;
      this.spawnDelay = spawnImmediately ? 0 : Math.random() * 3000;
      this.spawned = spawnImmediately;
      this.fadeIn = spawnImmediately ? 1 : 0;
      
      this.reset(spawnImmediately);
      if (spawnImmediately) {
        this.x = WALL_MARGIN + Math.random() * (width - WALL_MARGIN * 2);
        const floorY = height - 80;
        if (Math.random() < 0.4) {
          this.y = floorY - this.radius - Math.random() * 20;
          this.vy = 0;
          this.vx = (Math.random() - 0.5) * 0.5;
        } else {
          this.y = Math.random() * (floorY - 100);
        }
      }
    }
    
    reset(spawnImmediately = false) {
      this.x = WALL_MARGIN + Math.random() * (width - WALL_MARGIN * 2);
      this.y = -20 - Math.random() * 100;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = Math.random() * 0.5 + 0.5;
      this.life = 1.0;
      this.spawned = spawnImmediately;
      this.fadeIn = spawnImmediately ? 1 : 0;
      if (!spawnImmediately) {
        this.spawnDelay = Math.random() * 2000;
      }
    }
    
    getRandomColor() {
      const colors = [
        { r: 78, g: 205, b: 196 },   // Teal
        { r: 255, g: 107, b: 129 },  // Coral/Red
        { r: 187, g: 143, b: 206 },  // Purple
        { r: 100, g: 180, b: 220 },  // Soft Blue
        { r: 200, g: 140, b: 180 },  // Muted Pink
        { r: 140, g: 200, b: 160 },  // Soft Green
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update(deltaTime) {
      if (!this.spawned) {
        this.spawnDelay -= deltaTime * 16.67;
        if (this.spawnDelay <= 0) {
          this.spawned = true;
          this.fadeIn = 0;
        } else {
          return;
        }
      }
      
      if (this.fadeIn < 1) {
        this.fadeIn = Math.min(1, this.fadeIn + deltaTime * 0.05);
      }
      
      // Wind
      this.vx += WIND * this.windMultiplier * deltaTime;
      
      // Gravity
      this.vy += GRAVITY * deltaTime;
      
      // Turbulence
      this.vx += (Math.random() - 0.5) * TURBULENCE * deltaTime;
      this.vy += (Math.random() - 0.5) * TURBULENCE * 2 * deltaTime;
      
      // Mouse interaction
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.5;
        this.vy += Math.sin(angle) * force * 0.5;
      }
      
      // Nav arrow collision
      const dxLeft = this.x - leftArrowX;
      const dyLeft = this.y - arrowY;
      const distLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);
      
      if (distLeft < NAV_ARROW_RADIUS + this.radius && distLeft > 0) {
        const force = (1 - distLeft / (NAV_ARROW_RADIUS + this.radius)) * 1.5;
        const angle = Math.atan2(dyLeft, dxLeft);
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;
        this.impactFlash = 0.3;
      }
      
      const dxRight = this.x - rightArrowX;
      const dyRight = this.y - arrowY;
      const distRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);
      
      if (distRight < NAV_ARROW_RADIUS + this.radius && distRight > 0) {
        const force = (1 - distRight / (NAV_ARROW_RADIUS + this.radius)) * 1.5;
        const angle = Math.atan2(dyRight, dxRight);
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;
        this.impactFlash = 0.3;
      }
      
      // Apply velocity
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
      
      // Friction
      this.vx *= this.friction;
      this.vy *= this.friction;
      
      // LEFT WALL
      if (this.x - this.radius < WALL_MARGIN) {
        if (leftGateOpen) {
          if (this.x + this.radius < -20) {
            this.reset(true);
            return;
          }
        } else {
          this.x = WALL_MARGIN + this.radius;
          const impactSpeed = Math.abs(this.vx);
          this.vx *= -this.bounce;
          if (impactSpeed > 0.5) {
            this.impactFlash = impactSpeed * 0.2;
          }
        }
      }
      
      // RIGHT WALL
      if (this.x + this.radius > width - WALL_MARGIN) {
        if (rightGateOpen) {
          if (this.x - this.radius > width + 20) {
            this.reset(true);
            return;
          }
        } else {
          this.x = width - WALL_MARGIN - this.radius;
          const impactSpeed = Math.abs(this.vx);
          this.vx *= -this.bounce;
          if (impactSpeed > 0.5) {
            this.impactFlash = impactSpeed * 0.2;
          }
        }
      }
      
      // FLOOR
      const floorY = height - 80;
      if (this.y + this.radius > floorY) {
        this.y = floorY - this.radius;
        const impactSpeed = Math.abs(this.vy);
        this.vy *= -this.bounce * 0.85;
        this.vx *= 0.95;
        
        if (Math.abs(this.vy) < 0.15) {
          this.vy = 0;
        }
        if (impactSpeed > 0.8) {
          this.impactFlash = impactSpeed * 0.15;
        }
      }
      
      // CEILING
      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -this.bounce * 0.5;
      }
      
      // Fade impact flash
      if (this.impactFlash) {
        this.impactFlash *= 0.85;
        if (this.impactFlash < 0.01) this.impactFlash = 0;
      }
    }
    
    draw() {
      if (!this.spawned) return;
      
      const fadeMultiplier = this.fadeIn;
      
      // Impact flash ring
      if (this.impactFlash > 0) {
        const flashGradient = ctx.createRadialGradient(
          this.x, this.y, this.radius,
          this.x, this.y, this.radius * (3 + this.impactFlash * 2)
        );
        flashGradient.addColorStop(0, `rgba(255, 255, 255, ${this.impactFlash * 0.2 * fadeMultiplier})`);
        flashGradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.impactFlash * 0.15 * fadeMultiplier})`);
        flashGradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = flashGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * (3 + this.impactFlash * 2), 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Outer glow
      const glowSize = this.radius * (2.5 + this.glowIntensity);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, glowSize
      );
      const glowOpacity = ((this.opacity * this.glowIntensity) + (this.impactFlash * 0.1)) * fadeMultiplier;
      gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${glowOpacity * 0.8})`);
      gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${glowOpacity * 0.4})`);
      gradient.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${glowOpacity * 0.2})`);
      gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fill();
      
      // 3D core with gradient
      const coreOpacity = Math.min((this.opacity + this.impactFlash * 0.2) * fadeMultiplier, 0.95);
      const coreGradient = ctx.createRadialGradient(
        this.x - this.radius * 0.3, this.y - this.radius * 0.3, 0,
        this.x, this.y, this.radius * 1.2
      );
      coreGradient.addColorStop(0, `rgba(${Math.min(this.color.r + 60, 255)}, ${Math.min(this.color.g + 60, 255)}, ${Math.min(this.color.b + 60, 255)}, ${coreOpacity})`);
      coreGradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${coreOpacity})`);
      coreGradient.addColorStop(1, `rgba(${Math.max(this.color.r - 40, 0)}, ${Math.max(this.color.g - 40, 0)}, ${Math.max(this.color.b - 40, 0)}, ${coreOpacity})`);
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = `rgba(${Math.max(this.color.r - 30, 0)}, ${Math.max(this.color.g - 30, 0)}, ${Math.max(this.color.b - 30, 0)}, ${coreOpacity * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.4 + this.impactFlash * 0.2) * fadeMultiplier})`;
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    mouseX = width / 2;
    mouseY = height / 2;
    targetMouseX = width / 2;
    targetMouseY = height / 2;
    rightArrowX = width - 52;
    arrowY = height * 0.55;
    leftArrowX = 52;
  }
  
  function init() {
    particles = [];
    const immediateCount = Math.floor(PARTICLE_COUNT * 0.4);
    for (let i = 0; i < immediateCount; i++) {
      particles.push(new Particle(true));
    }
    for (let i = immediateCount; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(false));
    }
  }
  
  let lastTime = performance.now();
  
  function animate() {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2);
    lastTime = currentTime;
    
    // Update gate timers
    if (leftGateOpen) {
      leftGateTimer -= deltaTime * 16.67;
      if (leftGateTimer <= 0) {
        leftGateOpen = false;
      }
    }
    if (rightGateOpen) {
      rightGateTimer -= deltaTime * 16.67;
      if (rightGateTimer <= 0) {
        rightGateOpen = false;
      }
    }
    
    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;
    
    // Skip rendering if disabled
    if (!particlesEnabled) {
      ctx.clearRect(0, 0, width, height);
      requestAnimationFrame(animate);
      return;
    }
    
    // Clear with trail effect
    const isDarkMode = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDarkMode ? 'rgba(10, 10, 10, 0.25)' : 'rgba(245, 245, 247, 0.25)';
    ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    for (const particle of particles) {
      particle.update(deltaTime);
      particle.draw();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });
  
  // Initialize
  resize();
  window.addEventListener('resize', resize);
  init();
  animate();
})();
