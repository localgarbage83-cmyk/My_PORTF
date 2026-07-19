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
        primary: '#1a1a2e',
        secondary: '#16213e',
        accent: '#0f3460',
        highlight: '#e94560',
      },
      fontFamily: {
        en: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        bn: ['SolaimanLipi', 'Noto Sans Bengali', 'Kalpurush', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
