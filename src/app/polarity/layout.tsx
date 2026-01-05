'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/lib/auth-context';

const navItems = [
  { href: '/polarity', label: 'Hub' },
  { href: '/polarity/science', label: 'Science' },
  { href: '/polarity/app', label: 'App' },
];

function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
    >
      <div className="flex items-center gap-2">
        {/* Logo/Home link */}
        <Link
          href="/polarity"
          className="flex items-center gap-3 mr-6 group"
        >
          {/* Polarity logo mark */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(78, 205, 196, 0.3) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="url(#navGrad)" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="url(#navGrad)" />
              <defs>
                <linearGradient id="navGrad" x1="0" y1="0" x2="24" y2="24">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#4ECDC4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span
            className="text-white/90 font-semibold text-lg hidden sm:block"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}
          >
            Polarity
          </span>
        </Link>

        {/* Navigation tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-full transition-all"
          style={{
            background: scrolled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 rounded-full transition-colors"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(78, 205, 196, 0.25) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
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
      <main className="pt-20">
        {children}
      </main>
    </AuthProvider>
  );
}
