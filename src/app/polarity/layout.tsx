'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/lib/auth-context';
import { NavContext } from '@/lib/nav-context';

const navItems = [
  { id: 'hub', label: 'Hub' },
  { id: 'science', label: 'Science' },
  { id: 'polarity', label: 'Polarity' },
];

function SideNavigation({ activeSection, scrollToSection }: { activeSection: string; scrollToSection: (id: string) => void }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] hidden md:block"
    >
      <div className="flex flex-col items-start gap-1">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative flex items-center gap-3 py-2 px-1 group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Indicator line */}
              <motion.div
                className="relative w-8 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: isActive ? '100%' : isHovered ? '60%' : '0%',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: isActive
                      ? 'linear-gradient(90deg, #8B5CF6, #4ECDC4)'
                      : 'rgba(255, 255, 255, 0.5)',
                  }}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                className="text-sm font-medium whitespace-nowrap"
                animate={{
                  color: isActive ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                  x: isHovered || isActive ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {item.label}
              </motion.span>

              {/* Active glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: '#8B5CF6',
                      boxShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Divider */}
        <motion.div
          className="w-8 h-px my-3 ml-1"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />

        {/* Back arrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// Mobile nav - bottom bar
function MobileNavigation({ activeSection, scrollToSection }: { activeSection: string; scrollToSection: (id: string) => void }) {
  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden"
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: 'rgba(15, 15, 20, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-2 rounded-full transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(139, 92, 246, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 text-xs font-medium ${isActive ? 'text-white' : 'text-white/50'}`}
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

// Spatial background
function SpaceBackground() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(187, 143, 206, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Subtle grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.015 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(78, 205, 196, 0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}

export default function PolarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState('hub');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <NavContext.Provider value={{ activeSection, setActiveSection, scrollToSection }}>
        <SpaceBackground />
        <SideNavigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <MobileNavigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.main>
      </NavContext.Provider>
    </AuthProvider>
  );
}
