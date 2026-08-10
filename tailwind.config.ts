import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Each token resolves through a CSS custom property (set in globals.css
        // and swapped per [data-theme]), so `bg-bg-primary`, `bg-accent/10`, etc.
        // keep working unchanged while automatically following the active theme.
        bg: {
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card) / <alpha-value>)',
          cardHover: 'rgb(var(--color-bg-card-hover) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          dim: 'rgb(var(--color-accent-dim) / <alpha-value>)',
          muted: 'rgb(var(--color-accent-muted) / <alpha-value>)',
          glow: 'rgb(var(--color-accent) / 0.15)',
          glowStrong: 'rgb(var(--color-accent) / 0.35)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blink': 'blink 1.1s step-end infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(47,102,144,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(47,102,144,0.35), 0 0 80px rgba(47,102,144,0.1)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-radial': 'radial-gradient(ellipse at center, rgba(47,102,144,0.08) 0%, transparent 70%)',
      },
      boxShadow: {
        // Shadow tint also swaps per theme (near-black in dark mode, soft slate
        // in light mode) via --color-shadow, so cards don't look muddy on white.
        'card': '0 1px 3px rgb(var(--color-shadow) / 0.4), 0 1px 2px rgb(var(--color-shadow) / 0.5)',
        'card-hover': '0 8px 30px rgb(var(--color-shadow) / 0.5), 0 0 20px rgba(47,102,144,0.08)',
        'accent': '0 0 20px rgba(47,102,144,0.2)',
        'accent-strong': '0 0 40px rgba(47,102,144,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
