'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Password for access - change this to your desired password
const ACCESS_PASSWORD = 'polarity2024';

export default function PolarityApp() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated (via sessionStorage)
  useEffect(() => {
    const auth = sessionStorage.getItem('polarity_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem('polarity_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4ECDC4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
        {/* Spatial Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #BB8FCE 0%, transparent 70%)',
              bottom: '-150px',
              left: '-150px',
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
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
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            {/* Back arrow */}
            <Link
              href="/polarity"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/50 hover:text-white/80 hover:bg-white/5 transition-all mb-12"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>

            {/* Logo/Title */}
            <div className="text-center mb-10">
              <h1
                className="text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}
              >
                Welcome to Polarity
              </h1>
              <p
                className="text-white/50"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px' }}
              >
                Enter access code to continue
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Access code"
                  className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/30 outline-none transition-all"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  autoFocus
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-3 text-center"
                      style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full text-white font-semibold transition-all"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #3BB5AD 100%)',
                  boxShadow: '0 8px 24px 0 rgba(78, 205, 196, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                }}
              >
                Continue
              </motion.button>
            </form>

            {/* Hint */}
            <p
              className="text-center text-white/30 mt-8"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}
            >
              Early access is invite-only
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Authenticated - Show the actual app
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Spatial Background Elements */}
      <div className="absolute inset-0">
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
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl"
        >
          {/* Success state */}
          <div
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.2) 0%, rgba(78, 205, 196, 0.1) 100%)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
            }}
          >
            <svg className="w-10 h-10 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1
            className="text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}
          >
            You&apos;re in
          </h1>

          <p
            className="text-white/60 text-lg mb-12"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', lineHeight: 1.6 }}
          >
            Polarity is currently in private beta. We&apos;ll notify you when your account is ready.
          </p>

          {/* Status card */}
          <div
            className="p-8 rounded-3xl text-left"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#4ECDC4] animate-pulse" />
              <span
                className="text-[#4ECDC4] font-medium"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '14px' }}
              >
                Waitlist confirmed
              </span>
            </div>

            <h3
              className="text-white text-xl font-semibold mb-2"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              What happens next?
            </h3>
            <ul className="space-y-3 text-white/50" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px' }}>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] mt-1">1.</span>
                <span>We&apos;re rolling out access in waves</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] mt-1">2.</span>
                <span>You&apos;ll receive an email when your account is activated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] mt-1">3.</span>
                <span>Early users get lifetime premium features</span>
              </li>
            </ul>
          </div>

          {/* Back arrow */}
          <Link
            href="/polarity"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/40 hover:text-white/70 hover:bg-white/5 transition-all mt-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
