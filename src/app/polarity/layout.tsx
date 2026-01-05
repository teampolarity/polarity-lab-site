'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthProvider } from '@/lib/auth-context';

// Simple back button - no animation, just there
function BackButton() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-[100] flex items-center justify-center w-9 h-9 rounded-full opacity-40 hover:opacity-70 transition-opacity"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </Link>
  );
}

// Clean spatial background
function SpaceBackground() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(78, 205, 196, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(187, 143, 206, 0.06) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Subtle grid */}
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
    </motion.div>
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
      <BackButton />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </AuthProvider>
  );
}
