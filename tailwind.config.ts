import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF8',
        surface: '#FFFFFF',
        ink: '#1C1C1E',
        'ink-2': '#6B7280',
        'ink-3': '#9CA3AF',
        border: '#E5E7EB',
        'border-light': '#F3F4F6',
        'pastel-violet': '#A78BFA',
        'pastel-violet-bg': '#F5F3FF',
        'pastel-violet-border': '#E9D5FF',
        'pastel-blue': '#93C5FD',
        'pastel-blue-bg': '#EFF6FF',
        'pastel-mint-bg': '#ECFDF5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: { content: '1120px' },
    },
  },
  plugins: [],
}

export default config
