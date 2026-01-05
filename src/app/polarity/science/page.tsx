'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// POLARITY SCIENCE — Brain Mapping & System Architecture
// Deep dive for curious users
// ═══════════════════════════════════════════════════════════════════════════════

const ease = [0.16, 1, 0.3, 1];
const bouncy = [0.34, 1.56, 0.64, 1];

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

// Section wrapper
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

// Feature Icon
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

// Brain Region Card
function BrainRegionCard({
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
      {/* Hover glow */}
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
          <h4 className="text-white/95 font-semibold text-lg" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.name}</h4>
          <p className="text-white/50 text-sm" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.simpleRole}</p>
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
      <p className="relative z-10 text-white/65 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
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
          <span className="text-violet-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>How Polarity Uses This</span>
        </div>
        <p className="text-white/60 text-sm" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.whatPolarity}</p>
      </div>

      {/* Fun Fact */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <span className="text-amber-400 text-xs font-medium" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>Did you know?</span>
            <p className="text-white/45 text-xs mt-0.5" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.funFact}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors ml-4">
          <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>More</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// Brain Visualization
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

      {/* Brain region nodes */}
      {BRAIN_REGIONS.map((region, i) => {
        const positions = [
          { top: '25%', left: '50%' }, // Hippocampus
          { top: '15%', left: '50%' }, // Prefrontal
          { top: '55%', left: '30%' }, // Amygdala
          { top: '45%', left: '70%' }, // Temporal
          { top: '65%', left: '50%' }, // Basal Ganglia
          { top: '35%', left: '50%' }, // Cingulate
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
              <span className="text-[10px] font-medium" style={{ color: region.color, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.name}</span>
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
  if (!region || typeof window === 'undefined') return null;

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
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
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
                <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.name}</h3>
                <p className="text-sm text-white/50 mt-0.5" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.simpleRole}</p>
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
              <span className="text-white/40 text-xs" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>MNI</span>
              <span className="text-white/75 text-xs font-mono">{region.coordinates}</span>
            </div>

            <div>
              <h4 className="text-white/55 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>What It Does</h4>
              <p className="text-white/80 text-base leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.description}</p>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.18)' }}
            >
              <h4 className="text-violet-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>How Polarity Uses This</h4>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.whatPolarity}</p>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-xl bg-amber-500/12 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>Did You Know?</h4>
                <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{region.funFact}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}

// Definition Card
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
        <h3 className="text-white/90 font-semibold text-xl pt-3" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{title}</h3>
      </div>
      <p className="text-white/55 text-base leading-[1.8]" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>{description}</p>
    </motion.div>
  );
}

export default function SciencePage() {
  const [selectedRegion, setSelectedRegion] = useState<typeof BRAIN_REGIONS[0] | null>(null);

  return (
    <div className="min-h-screen text-white relative" style={{ background: '#0a0a0f', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      {/* Spatial Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-15 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)',
            top: '-300px',
            right: '-300px',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #BB8FCE 0%, transparent 70%)',
            bottom: '-200px',
            left: '-200px',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-8 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            top: '40%',
            left: '60%',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/polarity"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-12 transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm text-white/50">Back to Polarity</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white/95 mb-6">
                The Science Behind Polarity
              </h1>
              <p className="text-xl text-white/45 max-w-3xl mx-auto leading-relaxed">
                How we use neuroscience to organize your memories like your brain does
              </p>
            </motion.div>
          </div>
        </div>

        {/* MNI Brain Mapping */}
        <Section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.22)' }}
              >
                <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Neuroscience Foundation</span>
              </motion.div>
              <motion.h2
                className="text-3xl sm:text-4xl font-light text-white/95 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Your Brain, Mapped
              </motion.h2>
              <motion.p
                className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Every memory is stored in the brain region where it naturally belongs,
                using the Montreal Neurological Institute coordinate system - the global standard for brain mapping.
              </motion.p>
            </div>

            {/* Brain Visualization + Explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <BrainVisualization />

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div
                  className="p-6 rounded-[24px]"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
                  <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    What is MNI?
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    <strong className="text-white/75">MNI coordinates</strong> are like GPS for your brain.
                    Just as every location on Earth has latitude and longitude, every brain region has a 3D coordinate (X, Y, Z).
                    Scientists use this system globally to precisely locate brain structures.
                  </p>
                </div>

                <div
                  className="p-6 rounded-[24px]"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
                >
                  <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    How Polarity Uses This
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    When you share a memory, Polarity analyzes its content and stores it in the appropriate brain region.
                    A childhood memory goes to the <strong className="text-violet-400">Hippocampus</strong>.
                    An emotional experience goes to the <strong className="text-pink-400">Amygdala</strong>.
                    This creates a scientifically-accurate map of your mind.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['6 Brain Regions', '3D Coordinates', 'Scientific Accuracy', 'Visual Mapping'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-400"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Brain Region Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h3 className="text-2xl font-light text-white/90 mb-3">Explore Each Brain Region</h3>
              <p className="text-white/45 text-sm">Click each card to understand how your memories are mapped</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BRAIN_REGIONS.map((region, index) => (
                <BrainRegionCard
                  key={region.name}
                  region={region}
                  delay={index * 0.08}
                  onClick={() => setSelectedRegion(region)}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Brain Region Detail Modal */}
        <AnimatePresence>
          {selectedRegion && (
            <BrainRegionModal
              region={selectedRegion}
              onClose={() => setSelectedRegion(null)}
            />
          )}
        </AnimatePresence>

        {/* The Polarity System - Definitions */}
        <Section className="py-28 sm:py-36 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl sm:text-4xl font-light text-white/95 mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                The Polarity System
              </motion.h2>
              <motion.p
                className="text-lg text-white/45 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Understanding the core concepts that power your memory
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DefinitionCard
                title="Memory"
                description="A Memory in Polarity is any piece of information you share or experience: a thought you express, a conversation you have, a task you need to complete, a feeling you want to process. Each memory is timestamped to the exact moment, categorized by the brain region it belongs to based on MNI coordinates, and connected to related memories in your knowledge graph. Memories are the raw building blocks of your vault - every moment captured and preserved exactly as it happened."
                color="#8B5CF6"
                delay={0}
                icon={<svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>}
              />
              <DefinitionCard
                title="Knowledge"
                description="Knowledge is the synthesis and understanding that emerges from your memories over time. When patterns emerge across conversations, Polarity creates knowledge entries: facts about people you know, preferences you consistently show, lessons you have learned, and wisdom you have gained. Knowledge is persistent understanding that transcends individual moments - it is what you know to be true about yourself and your world. Unlike memories which capture moments, knowledge captures meaning."
                color="#22D3EE"
                delay={0.1}
                icon={<svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
              />
              <DefinitionCard
                title="Brain ID"
                description="Your Brain ID is your unique identifier within Polarity - a cryptographic key derived from your unique thinking patterns and interaction style. It is the only key that can unlock your vault. No email address, no password to forget, no security questions. Just a simple code that represents you. Your Brain ID ensures that your memories are yours alone - even Polarity cannot access your vault without it. It is both your identity and your encryption key, making your memory truly personal and secure."
                color="#10B981"
                delay={0.2}
                icon={<svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" /></svg>}
              />
              <DefinitionCard
                title="Calendar"
                description="The Polarity Calendar is not just a schedule - it is a time-aware companion that understands your life context. It automatically detects your timezone and location, learns your patterns and preferences, and helps you stay on top of commitments without the friction of traditional calendars. Events are linked to memories, so you can see the full context of every appointment. Recurring events, reminders, and important dates are all woven into your memory fabric, creating a seamless timeline of your life."
                color="#F59E0B"
                delay={0.3}
                icon={<svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>}
              />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link href="/polarity" className="text-white/40 hover:text-white/70 transition-colors text-sm">
                Back to Polarity
              </Link>
              <p className="text-white/30 text-sm">
                Your memory, preserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
