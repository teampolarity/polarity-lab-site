'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/lib/auth-context';

const navItems = [
  { href: '/polarity', label: 'Hub', description: 'Main landing page' },
  { href: '/polarity/science', label: 'Science', description: 'Brain mapping & research' },
  { href: '/polarity/app', label: 'App', description: 'Access Polarity' },
];

function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-6 z-[100]"
      ref={menuRef}
    >
      {/* Logo button that opens dropdown */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(78, 205, 196, 0.2) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isOpen || isHovered
            ? '0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 20px rgba(139, 92, 246, 0.15)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating orbital rings */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="absolute inset-0">
            <circle cx="24" cy="24" r="18" stroke="url(#orbitGrad)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Inner logo */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10">
          <circle cx="12" cy="12" r="10" stroke="url(#logoGrad)" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" fill="url(#logoGrad)" />
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#4ECDC4" />
            </linearGradient>
            <linearGradient id="orbitGrad" x1="0" y1="0" x2="48" y2="48">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#4ECDC4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-16 left-0 w-56 py-2 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15, 15, 20, 0.95)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                >
                  <motion.div
                    className="relative px-4 py-3 mx-2 rounded-xl transition-colors"
                    style={{
                      background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    }}
                    whileHover={{
                      background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-medium ${isActive ? 'text-white' : 'text-white/70'}`}
                        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px' }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #8B5CF6, #4ECDC4)' }}
                        />
                      )}
                    </div>
                    <span
                      className="text-white/40 mt-0.5 block"
                      style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '12px' }}
                    >
                      {item.description}
                    </span>
                  </motion.div>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="mx-4 my-2 h-px bg-white/10" />

            {/* Back to Portfolio */}
            <Link href="/" className="block">
              <motion.div
                className="px-4 py-3 mx-2 rounded-xl transition-colors"
                whileHover={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <div className="flex items-center gap-2 text-white/50">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '14px' }}>
                    Portfolio
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Spatial background
function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
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
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export default function PolarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SpaceBackground />
      <Navigation />
      <main>
        {children}
      </main>
    </AuthProvider>
  );
}
