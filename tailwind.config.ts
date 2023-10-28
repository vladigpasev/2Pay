import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      "paytone-one" : ['"Paytone One"', "sans-serif"]
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        'paytone-one': ['Paytone One', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [
      {
        paymentLight: {
          'primary': '#00a54c', // По-заситено зелено (Основни интерактивни елементи, текстове, връзки)
          'secondary': '#f2f3f5', // Мек, светъл сив (Второстепенни елементи)
          'accent': '#51c4a5', // Запазваме по-заситеното зелено за консистентност
          'neutral': '#ffffff', // Чисто бяло (Фонов цвят)
          'base-100': '#e9e9e9', // Много светъл сив с непрозрачност
          'info': '#aec8ff', // Мек син
          'success': '#00a54c', // По-заситено зелено
          'warning': '#fcd784', // Мек жълт
          'error': '#fc6f6f' // Мек червен
        }
      },
      {
        paymentDark: {
          'primary': '#00a54c', // По-заситено зелено
          'secondary': '#33353b', // По-тъмно сиво
          'accent': '#51c4a5', // Запазваме по-заситеното зелено за консистентност
          'neutral': '#1e1e1e', // Тъмна основа
          'base-100': '#444851', // По-тъмно сиво
          'info': '#87a9ff', // Мек син, но малко по-тъмен
          'success': '#00a54c', // По-заситено зелено
          'warning': '#fcb144', // По-тъмен мек жълт
          'error': '#fc4d4d' // По-тъмен мек червен
        }
      },
      'forest',
      'garden'
    ]
  },
  plugins: [require('daisyui')]
};
export default withUt(config);
