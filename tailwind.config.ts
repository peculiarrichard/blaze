import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        'header-100': '#141414',
        'header-200': '#101828',
        'header-300': '#1A1A21',
        'paragraph-100': '#667085',
        'paragraph-200': '#475467',
        'paragraph-300': '#344054',
        'paragraph-400': '#475467',
        'green-100': '#0F7221',
        'green-200': '#2C9E41',
        'green-300': '#1A8E30',
        'green-400': '#F3FFF6',
        'green-500': '#ADF3BA',
        'green-600': '#7DE390',
        'green-700': '#D7F9DE',
        'green-800': '#0F7221',
        'green-900': '#0C5F1B',
        'green-50': '#067647',
        'green-10': '#ABEFC6',
        'green-5': '#ECFDF3',
        'green-0': '#17B26A',
        'white-100': '#F9FFFA',
        'gray-100': '#EAECF0',
        'gray-200': '#D0D5DD',
        'gray-400': '#FCFCFD',
        'base-bg': '#0D1D14',
        'gray-300': '#F2F4F7',
        'gray-500': '#101928',
        'red-100': '#F04438',
        'lime-100': '#BCE37D',
        'purple-100': '#AB09F7',
        'purple-200': '#AA22FD',
        'purple-300': '#9E2C6A',
        'purple-400': '#CD4787',
        'purple-500': '#FFE8F4',
        'purple-600': '#FAEEFF',
        'purple-700': '#B5D2F4',
        'purple-800': '#C6DEFB',
        'blue-100': '#0968F7',
        'blue-200': '#ECF2FD',
        'blue-300': '#ABC6EF',
        'orange-100': '#FDB022',
        'orange-200': '#F79009',
      },
      fontSize: {
        'xl': '2.25rem',
        'xs': '1.875rem',
        'lg': '1.5rem',
        'base': '1.25rem',
        'sm': '1rem',
        'ss': '0.875rem',
        'sb': '0.75rem',

      },
      boxShadow: {
        'stats-card': '0px 1px 2px 0px rgba(16, 24, 40, 0.05);',
        'login': '0px 1px 2px 0px #1018280D;',
      }, 
      lineHeight: {
        'normal': '20px',
        'base': '24px',
        'large': '28px',
      }
    },
  },
  plugins: [],
}
export default config
