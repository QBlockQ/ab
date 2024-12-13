import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'stacks-purple': 'rgb(var(--stacks-purple))',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundColor: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      textColor: {
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        naskh: ['var(--font-noto-naskh-arabic)'],
      },
    },
  },
  plugins: [],
}

export default config
