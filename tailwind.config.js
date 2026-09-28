/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B5D45',
          hover: '#084936',
          dark: '#073B2A',
        },
        forest: '#073B2A',
        'deep-blue': '#123B5D',
        saffron: '#E59A24',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        warm: '#FAF9F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
