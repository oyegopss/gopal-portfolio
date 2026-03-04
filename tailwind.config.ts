import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#DC2626',
        'crimson-dark': '#B91C1C',
        'crimson-light': '#EF4444',
        charcoal: '#1a1a1a',
        'charcoal-light': '#2d2d2d',
        gold: '#D4AF37',
        'gold-light': '#F4D03F',
        warm: '#FAFAF8',
        'warm-muted': '#E8E6E3',
        orange: '#EA580C',
        'orange-dark': '#C2410C',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      fontSize: {
        '9xl': ['8rem', { lineHeight: '0.95' }],
      },
    },
  },
  plugins: [],
}
export default config
