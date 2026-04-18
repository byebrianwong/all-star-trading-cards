import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060a',
          900: '#0a0c14',
          800: '#10131e',
          700: '#191d2d',
          500: '#3a4163',
          300: '#8a91b4',
          100: '#e6e8f2',
        },
        rarity: {
          common: '#9aa3c2',
          rare: '#4aa9ff',
          legendary: '#f5b642',
          mythic: '#d946ef',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 20px 50px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover': '0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)',
        'glow-rare': '0 0 40px -5px rgba(74,169,255,0.5)',
        'glow-legendary': '0 0 50px -5px rgba(245,182,66,0.6)',
        'glow-mythic': '0 0 60px -5px rgba(217,70,239,0.7)',
      },
      backgroundImage: {
        'foil-holo': 'conic-gradient(from var(--foil-angle, 0deg) at 50% 50%, #ff6b6b, #feca57, #48dbfb, #ff6b9d, #c56cf0, #ff6b6b)',
        'radial-highlight': 'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.35), transparent 40%)',
      },
      keyframes: {
        'shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
