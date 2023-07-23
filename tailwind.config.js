/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'primary': '#0ea5e9',
      'secondary': '#7dd3fc',
      'fgcolor': '#f8fafc',
      'fgcolor-dark': '#1e293b',
      'bgcolor': '#e2e8f0',
      'bgcolor-dark': '#020617',
      'white': '#f8fafc',
      'red': '#dc2626',
      'red-light': '#f87171',
      'black': '#020617',
    },
  },
  plugins: [],
}
