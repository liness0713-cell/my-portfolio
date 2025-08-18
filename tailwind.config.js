/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans CJK JP', 'sans-serif'], // 支持中文字体
      },
      colors: {
        'custom-blue': '#258DCD',
        'custom-orange': '#F27709',
        'custom-green': '#0B939B',
        'custom-red': '#E84E14',
        'custom-green2': '#3B8235',
        'custom-red2': '#DA4B39',
      },
      borderColor: {
        'custom-blue': '#258DCD',
        'custom-orange': '#F27709',
        'custom-green': '#0B939B',
        'custom-red': '#E84E14',
        'custom-green2': '#3B8235',
        'custom-red2': '#DA4B39',
      },
    },
  },
  safelist: [
    'border-custom-blue',
    'border-custom-orange',
    'border-custom-green',
    'border-custom-red',
    'border-custom-green2',
    'border-custom-red2',
    'hover:bg-custom-blue',
    'hover:bg-custom-orange',
    'hover:bg-custom-green',
    'hover:border-custom-red',
    'hover:border-custom-green2',
    'hover:border-custom-red2',
  ],
  plugins: [],
};