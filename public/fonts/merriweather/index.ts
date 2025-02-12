import { Merriweather } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400',  '700', '900'],
  display: 'swap',
})
