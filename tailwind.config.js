/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4ecdc4',
        accent: '#ff6b6b',
        trust: '#1E40AF', // Royal blue for trust and professionalism
        'trust-light': '#3B82F6', // Lighter shade for hover states
        'trust-dark': '#1E3A8A',
        secondary: '#ffe66d' // Attention-grabbing highlight
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        float: 'float 4s ease-in-out infinite',
        gradient: 'gradient 15s ease infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in': 'slideIn 0.8s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite linear'
      },
      boxShadow: {
        'soft-xl': '0 20px 40px -10px rgba(0,0,0,0.15)',
        'neumorphic': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'glow': '0 0 20px rgba(30, 64, 175, 0.3)',
        'glow-lg': '0 0 30px rgba(30, 64, 175, 0.4)'
      },
      gradientColorStops: theme => ({
        'primary-accent': [theme('colors.primary'), theme('colors.accent')],
      })
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class' // Better form styling
    })
  ],
} 