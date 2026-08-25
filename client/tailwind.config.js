export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rekaz: {
          blue: '#0412fa',
          cyan: '#00a5ff',
          violet: '#99a1ff',
          black: '#010212',
          dark: '#292929',
          grey: '#636363',
          muted: '#757575',
          gold: '#f2c161',
          border: '#e0e0e0',
          bg: '#fbfaff',
          card: '#fafafa',
        },
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        instrument: ['Instrument Sans', 'sans-serif'],
        'instrument-serif': ['Instrument Serif', 'serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        'arabic-title': ['Thmanyah Serif Display', 'serif'],
        'arabic-text': ['Thmanyah Serif Text', 'serif'],
      },
      borderRadius: {
        'card': '28px',
        'card-sm': '20px',
        'card-md': '26px',
        'pill': '9999px',
        'btn': '14px',
      },
      maxWidth: {
        'container': '1150px',
      },
      backgroundImage: {
        'rekaz-gradient': 'linear-gradient(to bottom, #00a5ff, #0412fa)',
        'rekaz-gradient-r': 'linear-gradient(to right, #00a5ff, #0412fa)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}
