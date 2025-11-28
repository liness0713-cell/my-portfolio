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
        'custom-blue': '#268785',
        'custom-orange': '#FFB11B',
        'custom-green': '#4A593D',
        'custom-red': '#F17C67',
        'custom-green2': '#90B44B',
        'custom-red2': '#B9887D',
      },
      borderColor: {
        'custom-blue': '#268785',
        'custom-orange': '#FFB11B',
        'custom-green': '#4A593D',
        'custom-red': '#F17C67',
        'custom-green2': '#90B44B',
        'custom-red2': '#B9887D',
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
