'use client';

import { useEffect } from 'react';

export default function PolarityRedirect() {
  useEffect(() => {
    window.location.href = 'https://app.polarity-lab.com/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">Redirecting to Polarity...</p>
      </div>
    </div>
  );
}
