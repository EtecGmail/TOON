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
        primary: {
          50: '#f8f5f2',
          100: '#f0ebe5',
          200: '#e8dfd6',
          300: '#d8cdc0',
          400: '#b8a895',
          500: '#9c8774',
          600: '#7a6858',
          700: '#5e4e42',
          800: '#3f342c',
          900: '#2a221d',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      spacing: {
        'tatami-xs': '0.5rem',
        'tatami-sm': '1rem',
        'tatami-md': '1.5rem',
        'tatami-lg': '2rem',
        'tatami-xl': '3rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
