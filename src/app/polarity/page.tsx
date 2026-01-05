'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

// ═══════════════════════════════════════════════════════════════════════════════
// POLARITY — Personal Memory Companion
// Apple Vision Pro Level • Zero AI Mentions • Human Feel
// ═══════════════════════════════════════════════════════════════════════════════

const springConfig = { stiffness: 120, damping: 25, mass: 0.8 };
const ease = [0.16, 1, 0.3, 1];
const bouncy = [0.34, 1.56, 0.64, 1];

// Removed ScrollIndicator - using global nav buttons instead

// Animated counter
function AnimatedCounter({ value, suffix = '', prefix = '', startValue = 0 }: { value: number; suffix?: string; prefix?: string; startValue?: number }) {
  const [count, setCount] = useState(startValue);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // Slower for emotional impact
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic - feels like natural decay
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (value - startValue) * eased;
        setCount(Math.floor(current));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, startValue]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// Dynamic Memory Stat - Space/Orbital Theme
function DynamicMemoryStat() {
  const [currentStat, setCurrentStat] = useState(0);
  const [statIndex, setStatIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Memory science stats - unified purple palette
  const memoryStats = [
    { 
      value: 70, 
      label: 'fade within 24 hours',
      context: 'Most conversations', 
      color: '#BB8FCE',
    },
    { 
      value: 50, 
      label: 'forgotten in 1 hour',
      context: 'New information', 
      color: '#A78BFA',
    },
    { 
      value: 90, 
      label: 'lost within a week',
      context: 'Unreinforced memories', 
      color: '#BB8FCE',
    },
  ];

  const currentData = memoryStats[statIndex];

  // Rotate stats every 8 seconds (very slow)
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % memoryStats.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Animate number counter - ultra smooth
  useEffect(() => {
    if (!isInView) return;
    const duration = 3000; // Very slow, smooth animation
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ultra smooth easing - gentle ease-out
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * currentData.value);
      setCurrentStat(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    setCurrentStat(0);
    requestAnimationFrame(animate);
  }, [isInView, statIndex, currentData.value]);

  return (
    <div ref={ref} className="text-center relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={statIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {/* Context badge - liquid glass */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: `
                linear-gradient(180deg, 
                  ${currentData.color}20 0%, 
                  ${currentData.color}14 100%
                )
              `,
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              border: `1px solid ${currentData.color}35`,
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.15),
                inset 0 -0.5px 0 ${currentData.color}20,
                0 2px 12px ${currentData.color}15,
                0 0 20px ${currentData.color}08
              `,
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ 
                background: currentData.color,
                boxShadow: `0 0 10px ${currentData.color}70`,
              }}
            />
            <span 
              style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                color: currentData.color,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {currentData.context}
            </span>
          </motion.div>

          {/* Big stat */}
          <div 
            style={{
              fontSize: 'clamp(4rem, 12vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              lineHeight: 0.85,
              textShadow: `
                0 2px 1px rgba(255, 255, 255, 0.1),
                0 4px 20px rgba(0, 0, 0, 0.3)
              `,
              marginBottom: '1rem',
              fontFeatureSettings: '"tnum", "lnum"',
            }}
          >
            {currentStat}%
          </div>

          {/* Label */}
          <p 
            style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'rgba(255, 255, 255, 0.6)', 
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            {currentData.label}
          </p>

          {/* Progress dots */}
          <div className="flex gap-2.5 justify-center">
            {memoryStats.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i === statIndex 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)'
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: i === statIndex 
                    ? '0 0 10px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : 'inset 0 1px 1px rgba(0, 0, 0, 0.2)',
                }}
                animate={{
                  opacity: i === statIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Polarity Logo - Animated 3D Atom with Rotating Orbitals
function PolarityLogo({ size = 100 }: { size?: number }) {
  const orbitSize = size * 0.85;
  const coreSize = size * 0.35;
  const particleSize = size * 0.08;
  
  return (
    <motion.div 
      className="relative"
      style={{ width: size, height: size }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: bouncy }}
    >
      {/* Outer ambient glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(78,205,196,0.35) 0%, rgba(187,143,206,0.15) 40%, transparent 70%)',
          filter: 'blur(25px)',
          transform: 'scale(2)',
        }}
      />
      
      {/* Orbital Ring 1 - Teal (tilted -60deg, rotates clockwise) */}
      <motion.div
        className="absolute"
        style={{
          width: orbitSize,
          height: orbitSize * 0.35,
          left: '50%',
          top: '50%',
          marginLeft: -orbitSize / 2,
          marginTop: -orbitSize * 0.175,
          borderRadius: '50%',
          border: `${size * 0.025}px solid rgba(78,205,196,0.85)`,
          boxShadow: '0 0 20px rgba(78,205,196,0.6), 0 0 40px rgba(78,205,196,0.3), inset 0 0 15px rgba(78,205,196,0.2)',
          transform: 'rotateX(75deg) rotateZ(-60deg)',
        }}
        animate={{ rotateZ: [-60, 300] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {/* Electron particle on teal orbit */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: particleSize,
            height: particleSize,
            background: 'radial-gradient(circle at 30% 30%, #6EE7DF, #4ECDC4)',
            boxShadow: '0 0 15px rgba(78,205,196,0.9), 0 0 30px rgba(78,205,196,0.5)',
            top: -particleSize / 2,
            left: '50%',
            marginLeft: -particleSize / 2,
          }}
          animate={{ 
            left: ['0%', '100%', '0%'],
            top: [-particleSize / 2, -particleSize / 2, -particleSize / 2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Orbital Ring 2 - Coral (tilted 60deg, rotates counter-clockwise) */}
      <motion.div
        className="absolute"
        style={{
          width: orbitSize,
          height: orbitSize * 0.35,
          left: '50%',
          top: '50%',
          marginLeft: -orbitSize / 2,
          marginTop: -orbitSize * 0.175,
          borderRadius: '50%',
          border: `${size * 0.025}px solid rgba(255,160,122,0.85)`,
          boxShadow: '0 0 20px rgba(255,160,122,0.6), 0 0 40px rgba(255,160,122,0.3), inset 0 0 15px rgba(255,160,122,0.2)',
          transform: 'rotateX(75deg) rotateZ(60deg)',
        }}
        animate={{ rotateZ: [60, -300] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        {/* Electron particle on coral orbit */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: particleSize,
            height: particleSize,
            background: 'radial-gradient(circle at 30% 30%, #FFB89A, #FFA07A)',
            boxShadow: '0 0 15px rgba(255,160,122,0.9), 0 0 30px rgba(255,160,122,0.5)',
            top: -particleSize / 2,
            right: 0,
            marginRight: -particleSize / 2,
          }}
        />
      </motion.div>

      {/* Orbital Ring 3 - Purple (horizontal, rotates slowly) */}
      <motion.div
        className="absolute"
        style={{
          width: orbitSize,
          height: orbitSize * 0.35,
          left: '50%',
          top: '50%',
          marginLeft: -orbitSize / 2,
          marginTop: -orbitSize * 0.175,
          borderRadius: '50%',
          border: `${size * 0.025}px solid rgba(187,143,206,0.85)`,
          boxShadow: '0 0 20px rgba(187,143,206,0.6), 0 0 40px rgba(187,143,206,0.3), inset 0 0 15px rgba(187,143,206,0.2)',
          transform: 'rotateX(75deg) rotateZ(0deg)',
        }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {/* Electron particle on purple orbit */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: particleSize,
            height: particleSize,
            background: 'radial-gradient(circle at 30% 30%, #D4A5E8, #BB8FCE)',
            boxShadow: '0 0 15px rgba(187,143,206,0.9), 0 0 30px rgba(187,143,206,0.5)',
            bottom: -particleSize / 2,
            left: '25%',
            marginLeft: -particleSize / 2,
          }}
        />
      </motion.div>

      {/* Central Core - Glowing Teal Nucleus */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: coreSize,
          height: coreSize,
          left: '50%',
          top: '50%',
          marginLeft: -coreSize / 2,
          marginTop: -coreSize / 2,
          background: `
            radial-gradient(ellipse 60% 40% at 35% 30%, rgba(255,255,255,0.5) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #6EE7DF 0%, #4ECDC4 40%, #2BA89F 80%, #1F8A82 100%)
          `,
          boxShadow: `
            0 0 ${size * 0.15}px rgba(78,205,196,0.8),
            0 0 ${size * 0.3}px rgba(78,205,196,0.5),
            0 0 ${size * 0.5}px rgba(78,205,196,0.3),
            inset -${size * 0.03}px -${size * 0.03}px ${size * 0.08}px rgba(0,0,0,0.3),
            inset ${size * 0.02}px ${size * 0.02}px ${size * 0.05}px rgba(255,255,255,0.2)
          `,
        }}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            `0 0 ${size * 0.15}px rgba(78,205,196,0.8), 0 0 ${size * 0.3}px rgba(78,205,196,0.5), 0 0 ${size * 0.5}px rgba(78,205,196,0.3)`,
            `0 0 ${size * 0.2}px rgba(78,205,196,0.9), 0 0 ${size * 0.4}px rgba(78,205,196,0.6), 0 0 ${size * 0.6}px rgba(78,205,196,0.4)`,
            `0 0 ${size * 0.15}px rgba(78,205,196,0.8), 0 0 ${size * 0.3}px rgba(78,205,196,0.5), 0 0 ${size * 0.5}px rgba(78,205,196,0.3)`,
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Core highlight - 3D effect */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: coreSize * 0.4,
          height: coreSize * 0.25,
          left: '50%',
          top: '50%',
          marginLeft: -coreSize * 0.3,
          marginTop: -coreSize * 0.35,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  );
}

// Section wrapper with generous spacing
function Section({ 
  children, 
  className = '',
  id
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

// Apple-style feature icon - clean, consistent, bouncy
function FeatureIcon({ children, color = '#8B5CF6' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.div 
      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
      whileHover={{ scale: 1.08, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}30`,
        boxShadow: `0 8px 32px ${color}15`,
      }}
    >
      {children}
    </motion.div>
  );
}

// Feature card - spacious, elegant
function FeatureCard({ 
  title, 
  description, 
  icon,
  color = '#8B5CF6',
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: bouncy } }}
      className="relative p-7 rounded-[28px] group cursor-default"
      style={{
        background: `
          radial-gradient(ellipse 120% 100% at 50% -20%, ${color}08 0%, transparent 60%),
          rgba(255, 255, 255, 0.025)
        `,
        backdropFilter: 'blur(50px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 12px 50px -15px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-start gap-5">
        <FeatureIcon color={color}>{icon}</FeatureIcon>
        <div className="flex-1 pt-1">
          <h3 className="text-white/90 font-semibold text-lg mb-2">{title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// MNI Brain Regions
const BRAIN_REGIONS = [
  {
    name: 'Hippocampus',
    coordinates: '(-28, -20, -12)',
    simpleRole: 'Memory Maker',
    description: 'Creates new memories. When you remember your first day at school or where you parked, thank your hippocampus.',
    whatPolarity: 'Stores your personal experiences - events, places, and moments from your life.',
    funFact: 'London taxi drivers have larger hippocampi from memorizing 25,000 streets.',
    color: '#8B5CF6',
  },
  {
    name: 'Prefrontal Cortex',
    coordinates: '(0, 52, 24)',
    simpleRole: 'Decision Center',
    description: 'The executive center. Plans your day, makes decisions, controls impulses.',
    whatPolarity: 'Stores your goals, plans, and personality traits.',
    funFact: 'Not fully developed until age 25.',
    color: '#3B82F6',
  },
  {
    name: 'Amygdala',
    coordinates: '(-24, -4, -18)',
    simpleRole: 'Emotion Hub',
    description: 'Processes emotions, especially meaningful experiences and feelings.',
    whatPolarity: 'Stores emotionally significant memories.',
    funFact: 'Processes emotional signals in milliseconds.',
    color: '#EC4899',
  },
  {
    name: 'Temporal Lobe',
    coordinates: '(-54, -24, -8)',
    simpleRole: 'Knowledge Bank',
    description: 'Stores facts and meanings. Knows Paris is in France.',
    whatPolarity: 'Stores facts, people, and learned knowledge.',
    funFact: 'Damage can cause face blindness.',
    color: '#22D3EE',
  },
  {
    name: 'Basal Ganglia',
    coordinates: '(12, 8, 4)',
    simpleRole: 'Habit Engine',
    description: 'Automates repeated behaviors like typing or driving.',
    whatPolarity: 'Stores habits and routines.',
    funFact: 'Why you can drive on autopilot.',
    color: '#F59E0B',
  },
  {
    name: 'Cingulate Cortex',
    coordinates: '(0, 24, 32)',
    simpleRole: 'Self-Reflection',
    description: 'Monitors for errors. Active when something feels important.',
    whatPolarity: 'Used for introspection memories.',
    funFact: 'Activates during meaningful moments.',
    color: '#A78BFA',
  },
];

// Expanded Brain Region Card - shows info by default, clickable for more
function ExpandedBrainRegionCard({ 
  region,
  delay = 0,
  onClick,
}: { 
  region: typeof BRAIN_REGIONS[0];
  delay?: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className="p-6 rounded-[24px] relative overflow-hidden text-left group cursor-pointer w-full"
      style={{
        background: `
          radial-gradient(ellipse 150% 100% at 50% -30%, ${region.color}15 0%, transparent 60%),
          rgba(255, 255, 255, 0.025)
        `,
        backdropFilter: 'blur(40px)',
        border: `1px solid ${region.color}20`,
      }}
    >
      {/* Hover glow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 100%, ${region.color}15 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 mb-4">
        <motion.div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          animate={{ rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ 
            background: `${region.color}20`, 
            border: `1px solid ${region.color}30`,
          }}
        >
          <motion.div 
            className="w-4 h-4 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: region.color, boxShadow: `0 0 20px ${region.color}80` }}
          />
        </motion.div>
        <div className="flex-1">
          <h4 className="text-white/95 font-semibold text-lg">{region.name}</h4>
          <p className="text-white/50 text-sm">{region.simpleRole}</p>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-mono hidden sm:block"
            style={{ background: `${region.color}15`, color: `${region.color}`, border: `1px solid ${region.color}25` }}
          >
            MNI {region.coordinates}
          </div>
          <svg 
            className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 text-white/65 text-sm leading-relaxed mb-4">
        {region.description}
      </p>

      {/* How Polarity Uses This */}
      <div 
        className="relative z-10 p-4 rounded-xl mb-3"
        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          <span className="text-violet-400 text-xs font-semibold uppercase tracking-wider">How Polarity Uses This</span>
        </div>
        <p className="text-white/60 text-sm">{region.whatPolarity}</p>
      </div>

      {/* Fun Fact + Click hint */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <span className="text-amber-400 text-xs font-medium">Did you know?</span>
            <p className="text-white/45 text-xs mt-0.5">{region.funFact}</p>
          </div>
        </div>
        
        {/* Click for more indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors ml-4">
          <span className="text-[10px] uppercase tracking-wider">More</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// Brain Visualization - Simple elegant brain diagram
function BrainVisualization() {
  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto aspect-square"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      {/* Brain outline */}
      <div 
        className="absolute inset-8 rounded-[40%_40%_35%_35%] rotate-[-5deg]"
        style={{
          background: 'radial-gradient(ellipse 100% 90% at 50% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)',
          border: '1.5px solid rgba(139,92,246,0.2)',
          boxShadow: '0 0 60px rgba(139,92,246,0.1), inset 0 0 40px rgba(139,92,246,0.05)',
        }}
      />
      
      {/* Brain region nodes with connections */}
      {BRAIN_REGIONS.map((region, i) => {
        // Position each region in a meaningful location
        const positions = [
          { top: '25%', left: '50%', label: 'top' }, // Hippocampus - center-top
          { top: '15%', left: '50%', label: 'front' }, // Prefrontal - front
          { top: '55%', left: '30%', label: 'left' }, // Amygdala - left side
          { top: '45%', left: '70%', label: 'right' }, // Temporal - right side
          { top: '65%', left: '50%', label: 'center' }, // Basal Ganglia - center
          { top: '35%', left: '50%', label: 'mid' }, // Cingulate - middle
        ];
        const pos = positions[i];
        
        return (
          <motion.div
            key={region.name}
            className="absolute flex flex-col items-center"
            style={{ 
              top: pos.top, 
              left: pos.left, 
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: bouncy }}
          >
            {/* Pulse ring */}
            <motion.div 
              className="absolute w-12 h-12 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              style={{ background: `radial-gradient(circle, ${region.color}40 0%, transparent 70%)` }}
            />
            
            {/* Node */}
            <motion.div
              className="w-6 h-6 rounded-full relative z-10 cursor-pointer"
              whileHover={{ scale: 1.3 }}
              style={{ 
                background: `radial-gradient(circle at 30% 30%, ${region.color} 0%, ${region.color}80 100%)`,
                boxShadow: `0 0 20px ${region.color}60, inset 2px 2px 4px rgba(255,255,255,0.2)`,
              }}
            />
            
            {/* Label */}
            <motion.div 
              className="mt-2 px-2 py-1 rounded-full whitespace-nowrap"
              style={{ 
                background: 'rgba(0,0,0,0.15)', 
                border: `1px solid ${region.color}25`,
              }}
            >
              <span className="text-[10px] font-medium" style={{ color: region.color }}>{region.name}</span>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
          </linearGradient>
        </defs>
        {/* Draw connection lines between regions */}
        <motion.path 
          d="M50 25 L50 15 M50 25 L30 55 M50 25 L70 45 M50 25 L50 35 M50 35 L50 65 M30 55 L50 65 M70 45 L50 65"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}

// Brain Region Modal
function BrainRegionModal({ 
  region, 
  onClose 
}: { 
  region: typeof BRAIN_REGIONS[0] | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!region || !mounted) return null;

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.25)' }}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: bouncy }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[32px] overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 140% 100% at 50% -30%, ${region.color}15 0%, transparent 60%),
            rgba(12, 12, 18, 0.98)
          `,
          backdropFilter: 'blur(80px)',
          border: `1px solid ${region.color}25`,
          boxShadow: `0 50px 100px -25px rgba(0,0,0,0.8), 0 0 80px ${region.color}12`,
        }}
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ 
                  background: `${region.color}18`, 
                  border: `1px solid ${region.color}35`,
                }}
              >
                <div 
                  className="w-5 h-5 rounded-full"
                  style={{ background: region.color, boxShadow: `0 0 20px ${region.color}80` }}
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{region.name}</h3>
                <p className="text-sm text-white/50 mt-0.5">{region.simpleRole}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: `${region.color}12`, border: `1px solid ${region.color}20` }}
            >
              <span className="text-white/40 text-xs">MNI</span>
              <span className="text-white/75 text-xs font-mono">{region.coordinates}</span>
            </div>

            <div>
              <h4 className="text-white/55 text-xs uppercase tracking-wider mb-2">What It Does</h4>
              <p className="text-white/80 text-base leading-relaxed">{region.description}</p>
            </div>

            <div 
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.18)' }}
            >
              <h4 className="text-violet-400 text-xs uppercase tracking-wider mb-2">How Polarity Uses This</h4>
              <p className="text-white/70 text-sm leading-relaxed">{region.whatPolarity}</p>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-xl bg-amber-500/12 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 text-xs uppercase tracking-wider mb-1">Did You Know?</h4>
                <p className="text-white/55 text-sm leading-relaxed">{region.funFact}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

// Definition Card - comprehensive, spacious
function DefinitionCard({ 
  title, 
  description, 
  icon,
  color = '#8B5CF6',
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      className="p-8 rounded-[28px]"
      style={{
        background: `
          radial-gradient(ellipse 120% 100% at 50% -30%, ${color}10 0%, transparent 60%),
          rgba(255,255,255,0.02)
        `,
        backdropFilter: 'blur(50px)',
        border: `1px solid ${color}15`,
      }}
    >
      <div className="flex items-start gap-5 mb-5">
        <FeatureIcon color={color}>{icon}</FeatureIcon>
        <h3 className="text-white/90 font-semibold text-xl pt-3">{title}</h3>
      </div>
      <p className="text-white/55 text-base leading-[1.8]">{description}</p>
    </motion.div>
  );
}

// Main page
export default function OpeningPage() {
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.96]);

  return (
    <div className="min-h-screen text-white" style={{ background: 'transparent' }}>
      {/* Contextual Scroll Navigation now handled globally by AppShell */}
      
      {/* Day Space Background - handled by SpaceBackground in AppShell */}
      {/* Additional stars overlay for landing page */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Stars overlay */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 90px 40px, white, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 160px 120px, white, transparent),
              radial-gradient(1.5px 1.5px at 200px 60px, rgba(255,255,240,0.9), transparent),
              radial-gradient(1px 1px at 250px 150px, white, transparent),
              radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1.5px 1.5px at 350px 100px, white, transparent),
              radial-gradient(1px 1px at 400px 70px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 450px 130px, white, transparent),
              radial-gradient(1px 1px at 500px 50px, rgba(255,255,255,0.7), transparent)
            `,
            backgroundSize: '550px 200px',
          }}
        />
        
        {/* Atmospheric horizon glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[30%]"
          style={{
            background: `
              linear-gradient(180deg,
                transparent 0%,
                rgba(40, 80, 140, 0.05) 50%,
                rgba(60, 100, 160, 0.08) 100%
              )
            `,
          }}
        />
      </div>

      {/* Hero Section - Spacious, impactful */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-32"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="w-full max-w-[90rem] mx-auto text-center">
          <motion.div
            className="mb-14 flex justify-center"
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: bouncy }}
          >
            <PolarityLogo size={160} />
          </motion.div>

          <motion.h1 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'rgba(255, 255, 255, 0.92)',
              marginBottom: '2rem',
            }}
          >
            Remember Everything That Matters
          </motion.h1>

          <motion.p 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.125rem)',
              fontWeight: 450,
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.68)',
              marginBottom: '3.5rem',
              maxWidth: '52rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              letterSpacing: '0.01em',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            Capture your conversations · Understand your emotions · Remember what matters
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mb-0"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
              <Link
                href="/polarity/app"
                className="relative inline-block text-white font-semibold rounded-full overflow-hidden"
                style={{
                  padding: '18px 48px',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #3BB5AD 100%)',
                  boxShadow: '0 8px 24px 0 rgba(78, 205, 196, 0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Use Polarity
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* The Problem - Breathable & Contextual */}
      <Section className="min-h-screen flex items-start justify-center py-24 px-6 sm:px-10 lg:px-16" id="why-polarity">
        <div className="w-full max-w-[85rem] mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-24"
          >
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4.5vw, 3rem)', 
              fontWeight: 600, 
              color: '#ffffff', 
              marginBottom: '1.75rem', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.1 
            }}>
              Your memory is disappearing
            </h2>
            <p style={{ 
              fontSize: 'clamp(17px, 2vw, 20px)', 
              color: 'rgba(255,255,255,0.65)', 
              maxWidth: '52rem', 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              lineHeight: 1.65 
            }}>
              Most of what you experience, learn, and feel fades away before you can capture it
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="text-center relative"
          >
            {/* Radial dark scrim for legibility (vignette effect) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,0,0,0.4) 0%, transparent 70%)',
                top: '-20%',
                bottom: '-20%',
                zIndex: 0,
              }}
            />

            {/* iOS-Style Glass Card */}
            <div className="mb-0 relative z-10">
              <motion.div 
                className="px-12 sm:px-16 py-12 sm:py-14 rounded-[40px] inline-block relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: `
                    linear-gradient(180deg, 
                      rgba(187, 143, 206, 0.12) 0%, 
                      rgba(139, 92, 246, 0.08) 50%,
                      rgba(139, 92, 246, 0.06) 100%
                    )
                  `,
                  backdropFilter: 'blur(80px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                  border: '1px solid rgba(187, 143, 206, 0.2)',
                  boxShadow: `
                    inset 0 1px 1px rgba(255, 255, 255, 0.12),
                    inset 0 -1px 1px rgba(139, 92, 246, 0.15),
                    0 10px 40px rgba(139, 92, 246, 0.15),
                    0 0 60px rgba(187, 143, 206, 0.1)
                  `,
                }}
              >
                <DynamicMemoryStat />
                
                {/* Top glass shine */}
                <div 
                  className="absolute top-0 left-[10%] right-[10%] h-[2px] pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 50%, transparent)',
                    filter: 'blur(1px)',
                  }}
                />
              </motion.div>
            </div>

          </motion.div>

          
          {/* Scroll to next section */}
        </div>
      </Section>

      {/* What Polarity Does - Visual Cards with Context */}
      <Section className="min-h-screen flex items-start justify-center py-24 px-6 sm:px-10 lg:px-16" id="features">
        <div className="w-full max-w-[85rem] mx-auto">
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: '#ffffff', marginBottom: '1.75rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              How it works
            </h2>
            <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'rgba(255,255,255,0.65)', maxWidth: '52rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.65 }}>
              Three simple steps between you and perfect memory
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-16">
            {/* 1. Just Talk */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(78, 205, 196, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(78, 205, 196, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(78, 205, 196, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(78, 205, 196, 0.15)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  Just talk to it
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Text, voice, thought, feeling. No formatting. No fields. No friction.
                </p>
              </div>
            </motion.div>

            {/* 2. It Understands */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(139, 92, 246, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  It understands context
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Emotion, intention, memory type. Mapped to 6 brain regions via MNI coordinates.
                </p>
              </div>
            </motion.div>

            {/* 3. Never Forget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(187, 143, 206, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(187, 143, 206, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(187, 143, 206, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(187, 143, 206, 0.15)',
                    border: '1px solid rgba(187, 143, 206, 0.3)',
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#BB8FCE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  You never forget
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Stored as memory nodes. Time-stamped. Brain-aware. Automatically linked.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Emergent note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p style={{ 
              fontSize: 'clamp(16px, 1.8vw, 18px)', 
              color: 'rgba(255,255,255,0.55)', 
              letterSpacing: '0.01em',
              lineHeight: 1.6,
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Everything else (calendar, knowledge graphs, patterns) emerges from this core.
            </p>
          </motion.div>
          
        </div>
      </Section>


      {/* Security - Premium Feature Card */}
      <Section className="min-h-screen flex items-start justify-center py-24 px-6 sm:px-10 lg:px-16" id="security">
        <div className="w-full max-w-[85rem] mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-20"
          >
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: 600, 
              color: '#ffffff', 
              marginBottom: '1.75rem', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.1 
            }}>
              Your memories are yours alone
            </h2>
            <p style={{ 
              fontSize: 'clamp(17px, 2vw, 20px)', 
              color: 'rgba(255,255,255,0.65)', 
              maxWidth: '52rem', 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              lineHeight: 1.65 
            }}>
              End-to-end encryption. Zero-knowledge architecture. Your key, your data.
            </p>
          </motion.div>

          {/* Security Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-16">
            {/* Encrypted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(78, 205, 196, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(78, 205, 196, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(78, 205, 196, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(78, 205, 196, 0.15)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(78, 205, 196, 0.3)',
                      '0 0 30px rgba(78, 205, 196, 0.5)',
                      '0 0 20px rgba(78, 205, 196, 0.3)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  Encrypted on device
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Your Brain ID encrypts everything before it leaves your device. No plaintext. Ever.
                </p>
              </div>
            </motion.div>

            {/* Zero Knowledge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(78, 205, 196, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(78, 205, 196, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(78, 205, 196, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(78, 205, 196, 0.15)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  We can't read it
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Zero-knowledge architecture. We store encrypted data. Can't decrypt. Can't read. Can't access.
                </p>
              </div>
            </motion.div>

            {/* Your Key */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-[28px] relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 140% 100% at 50% -20%, rgba(78, 205, 196, 0.12) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.03)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(78, 205, 196, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 8px 32px rgba(78, 205, 196, 0.15)
                `,
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(78, 205, 196, 0.15)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="w-8 h-8 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </motion.div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  Only you have the key
                </h3>
                
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
                  Your Brain ID is the only key. No backdoors. No recovery. No exceptions. Your vault, your control.
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </Section>

      {/* Science Page Link - Make it obvious */}
      <Section className="min-h-screen flex items-start justify-center py-24 px-6 sm:px-10 lg:px-16" id="science-link">
        <div className="w-full max-w-[75rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/polarity/science"
              className="block p-14 rounded-[32px] relative overflow-hidden group"
              style={{
                background: `
                  radial-gradient(ellipse 150% 100% at 50% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
                  rgba(255, 255, 255, 0.04)
                `,
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.12),
                  0 12px 40px rgba(139, 92, 246, 0.2)
                `,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
                  style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <svg className="w-10 h-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </motion.div>

                {/* Label badge */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B5CF6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Dedicated Page
                  </span>
                </div>

                {/* Title */}
                <h3 
                  className="mb-5"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
                    fontWeight: 600, 
                    color: '#ffffff', 
                    letterSpacing: '-0.025em', 
                    lineHeight: 1.2 
                  }}
                >
                  The Science Behind Polarity
                </h3>
                
                {/* Description */}
                <p 
                  className="mb-8"
                  style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.7', 
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '40rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  Explore the neuroscience, brain mapping, and memory research that powers Polarity. See how MNI coordinates map your memories to real brain regions.
                </p>

                {/* CTA Arrow */}
                <div className="flex items-center justify-center gap-2 text-[#8B5CF6] group-hover:gap-3 transition-all">
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Explore the research</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
          
        </div>
      </Section>

      {/* Final CTA - Spacious & Inviting */}
      <Section className="min-h-screen flex items-start justify-center py-32 px-6 sm:px-10 lg:px-16" id="final-cta">
        <div className="w-full max-w-[85rem] mx-auto text-center">
          <motion.div 
            className="mb-16"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <PolarityLogo size={140} />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '2rem',
              letterSpacing: '-0.03em',
            }}
          >
            Ready to remember everything?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(17px, 2vw, 19px)',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '3.5rem',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.65,
            }}
          >
            Create your encrypted vault in seconds. Start capturing what matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/polarity/app"
              className="inline-flex items-center gap-3 rounded-full text-white font-semibold"
              style={{
                padding: '20px 48px',
                fontSize: '19px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, #4ECDC4 0%, #3BB5AD 100%)',
                boxShadow: '0 12px 36px -8px rgba(78, 205, 196, 0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              Use Polarity
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 px-6 sm:px-10 lg:px-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[90rem] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 70%)',
                    filter: 'blur(4px)',
                    transform: 'scale(1.4)',
                  }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: 26,
                    height: 9,
                    left: '50%',
                    top: '50%',
                    marginLeft: -13,
                    marginTop: -4.5,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(78,205,196,0.85)',
                    boxShadow: '0 0 8px rgba(78,205,196,0.5)',
                    transform: 'rotateX(70deg) rotateZ(-60deg)',
                  }}
                  animate={{ rotateZ: [-60, 300] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: 26,
                    height: 9,
                    left: '50%',
                    top: '50%',
                    marginLeft: -13,
                    marginTop: -4.5,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,160,122,0.85)',
                    boxShadow: '0 0 8px rgba(255,160,122,0.5)',
                    transform: 'rotateX(70deg) rotateZ(60deg)',
                  }}
                  animate={{ rotateZ: [60, -300] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: 26,
                    height: 9,
                    left: '50%',
                    top: '50%',
                    marginLeft: -13,
                    marginTop: -4.5,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(187,143,206,0.85)',
                    boxShadow: '0 0 8px rgba(187,143,206,0.5)',
                    transform: 'rotateX(70deg) rotateZ(0deg)',
                  }}
                  animate={{ rotateZ: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    left: '50%',
                    top: '50%',
                    marginLeft: -6,
                    marginTop: -6,
                    background: 'radial-gradient(circle at 35% 35%, #6EE7DF, #4ECDC4, #2BA89F)',
                    boxShadow: '0 0 10px rgba(78,205,196,0.7), 0 0 20px rgba(78,205,196,0.3)',
                  }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span className="text-white/60 text-sm font-semibold tracking-[0.12em]">POLARITY</span>
            </div>
            
            {/* Center: Tagline (hidden on mobile) */}
            <p className="text-white/35 text-sm hidden md:block">
              Your memory, preserved
            </p>
            
            {/* Right: Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <motion.a
                href="https://instagram.com/polarity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.08,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-[18px] h-[18px] text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:hello@polarity.app"
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.08,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-[18px] h-[18px] text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/company/polarity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.08,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-[18px] h-[18px] text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              {/* Website */}
              <motion.a
                href="https://polarity.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.08,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-[18px] h-[18px] text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
