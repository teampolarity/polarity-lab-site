// ============================================
// BALL DROPPING PARTICLE PHYSICS SYSTEM
// ============================================
// Copy this entire code to use in another project

(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = width / 2;
  let targetMouseY = height / 2;
  
  // Responsive particle count - fewer for better legibility
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 25 : 50;
  const GRAVITY = 0.08; // Gentler gravity for smoother motion
  const MOUSE_RADIUS = 150;
  const MOUSE_FORCE = 0.6; // Softer mouse interaction
  
  class Particle {
    constructor(spawnImmediately = false) {
      // Give each particle unique characteristics - more subtle
      this.bounce = Math.random() * 0.2 + 0.65; // 0.65 to 0.85 - gentler bouncing
      this.friction = Math.random() * 0.015 + 0.98; // 0.98 to 0.995 - smoother motion
      this.floorFriction = Math.random() * 0.08 + 0.88; // Less aggressive floor friction
      this.radius = Math.random() * 3.5 + 1.8; // Better visibility: 1.8 to 5.3px
      this.mass = this.radius * this.radius;
      this.gravityMultiplier = Math.random() * 0.3 + 0.85; // More consistent gravity
      this.color = this.getRandomColor();
      this.opacity = Math.random() * 0.3 + 0.3; // Better visibility: 0.3 to 0.6
      this.glowIntensity = Math.random() * 0.4 + 0.3; // Softer glow
      this.impactFlash = 0;
      this.spawnDelay = spawnImmediately ? 0 : Math.random() * 3000; // Random spawn time
      this.spawned = spawnImmediately;
      this.fadeIn = spawnImmediately ? 1 : 0; // Fade in effect
      
      this.reset(spawnImmediately);
      if (spawnImmediately) {
        // Start with random positions for initial state
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.8;
      }
    }
    
    reset(spawnImmediately = false) {
      this.x = Math.random() * width;
      this.y = -20;
      this.vx = (Math.random() - 0.5) * 1.5; // Gentler horizontal velocity
      this.vy = Math.random() * 1.5 + 0.5; // Softer fall speed
      this.life = 1.0;
      this.spawned = spawnImmediately;
      this.fadeIn = spawnImmediately ? 1 : 0;
      if (!spawnImmediately) {
        this.spawnDelay = Math.random() * 2000;
      }
    }
    
    getRandomColor() {
      const colors = [
        { r: 78, g: 205, b: 196 },   // Teal (main brand color)
        { r: 187, g: 143, b: 206 },  // Purple (main brand color)
        { r: 255, g: 160, b: 122 },  // Coral (main brand color)
        { r: 100, g: 180, b: 220 },  // Soft Blue
        { r: 200, g: 140, b: 180 },  // Muted Pink
        { r: 140, g: 200, b: 160 },  // Soft Green
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update(deltaTime) {
      // Check if particle should spawn yet
      if (!this.spawned) {
        this.spawnDelay -= deltaTime * 16.67; // Convert to ms
        if (this.spawnDelay <= 0) {
          this.spawned = true;
          this.fadeIn = 0;
        } else {
          return; // Don't update or draw yet
        }
      }
      
      // Fade in effect
      if (this.fadeIn < 1) {
        this.fadeIn = Math.min(1, this.fadeIn + deltaTime * 0.05);
      }
      
      // Apply gravity with particle's unique gravity multiplier - smoothly
      this.vy += GRAVITY * this.gravityMultiplier * deltaTime;
      
      // Mouse interaction - gentle push away
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
        const angle = Math.atan2(dy, dx);
        // Gentle push away from mouse
        this.vx += Math.cos(angle) * force * 0.5;
        this.vy += Math.sin(angle) * force * 0.5;
      }
      
      // Apply velocity
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
      
      // Apply this particle's unique air friction
      this.vx *= this.friction;
      this.vy *= this.friction;
      
      // Floor collision (bottom of screen)
      if (this.y + this.radius > height) {
        this.y = height - this.radius;
        const impactSpeed = Math.abs(this.vy);
        this.vy *= -this.bounce; // Use particle's unique bounce
        this.vx *= this.floorFriction; // Use particle's unique floor friction
        
        // Subtle flash effect on impact
        if (impactSpeed > 0.8) {
          this.impactFlash = impactSpeed * 0.15; // Much subtler flash
        }
        
        // Give a gentle bounce if nearly stopped
        if (Math.abs(this.vy) < 0.2) {
          this.vy = -(Math.random() * 0.8 + 0.3);
        }
      }
      
      // Fade impact flash smoothly
      if (this.impactFlash) {
        this.impactFlash *= 0.85;
        if (this.impactFlash < 0.01) this.impactFlash = 0;
      }
      
      // Side walls with unique bounce
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -this.bounce * 0.9;
      } else if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx *= -this.bounce * 0.9;
      }
      
      // Ceiling with unique bounce
      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -this.bounce * 0.9;
      }
    }
    
    draw() {
      // Don't draw if not spawned yet
      if (!this.spawned) return;
      
      // Apply fade in multiplier to all opacities
      const fadeMultiplier = this.fadeIn;
      
      // Subtle impact flash ring when bouncing
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
      
      // Soft outer glow
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
      
      // Soft core
      const coreOpacity = Math.min((this.opacity * 1.5 + this.impactFlash * 0.15) * fadeMultiplier, 0.8);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${coreOpacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Subtle highlight for bigger particles
      if (this.radius > 2) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.25 * this.opacity + this.impactFlash * 0.1) * fadeMultiplier})`;
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    mouseX = width / 2;
    mouseY = height / 2;
    targetMouseX = width / 2;
    targetMouseY = height / 2;
  }
  
  function init() {
    particles = [];
    // Spawn half immediately, rest randomly over time
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
    
    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;
    
    // Clear with more trail for smoother, softer motion
    const isDarkMode = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDarkMode ? 'rgba(10, 10, 10, 0.25)' : 'rgba(245, 245, 247, 0.25)';
    ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update(deltaTime);
      particle.draw();
    });
    
    // Draw subtle connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      if (!particles[i].spawned) continue;
      
      for (let j = i + 1; j < particles.length; j++) {
        if (!particles[j].spawned) continue;
        
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.12; // More subtle connections
          // Mix colors from both particles
          const c1 = particles[i].color;
          const c2 = particles[j].color;
          const mixR = (c1.r + c2.r) / 2;
          const mixG = (c1.g + c2.g) / 2;
          const mixB = (c1.b + c2.b) / 2;
          
          // Thinner lines
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(${mixR}, ${mixG}, ${mixB}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Mouse tracking with smooth interpolation on document level
  let mouseMoveTimeout;
  document.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
    
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      targetMouseX = width / 2;
      targetMouseY = height / 2;
    }, 2000);
  });
  
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    }
  }, { passive: true });
  
  window.addEventListener('resize', () => {
    resize();
    init();
  });
  
  // Parallax effect on scroll
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    // Give particles a gentle push when scrolling
    if (Math.abs(scrollDelta) > 2) {
      particles.forEach(particle => {
        if (particle.spawned) {
          particle.vy += scrollDelta * 0.025; // Gentler push
          particle.vx += (Math.random() - 0.5) * Math.abs(scrollDelta) * 0.015;
        }
      });
    }
    
    lastScrollY = scrollY;
  });
  
  // Initialize
  resize();
  init();
  animate();
})();
