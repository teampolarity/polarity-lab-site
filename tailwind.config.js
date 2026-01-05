/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neural: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252532',
          500: '#35354a',
        },
        synapse: {
          blue: '#4f9eff',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#22d3ee',
        },
        memory: {
          episodic: '#f59e0b',
          semantic: '#10b981',
          procedural: '#6366f1',
          emotional: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #4f9eff, 0 0 10px #4f9eff' },
          '100%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7' },
        }
      }
    },
  },
  plugins: [],
}
