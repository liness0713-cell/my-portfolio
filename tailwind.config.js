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
        'custom-blue': '#E8D8D3',
        'custom-orange': '#C7C8B9',
        'custom-green': '#A6C0BB',
        'custom-red': '#D9C9C0',
        'custom-green2': '#B8AEA2',
        'custom-red2': '#D1C7A2',
      },
      borderColor: {
        'custom-blue': '#E8D8D3',
        'custom-orange': '#C7C8B9',
        'custom-green': '#A6C0BB',
        'custom-red': '#D9C9C0',
        'custom-green2': '#B8AEA2',
        'custom-red2': '#D1C7A2',
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
    'hover:bg-custom-red',
    'hover:bg-custom-green2',
    'hover:bg-custom-red2',
  ],
  plugins: [],
};
