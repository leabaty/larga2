import LocalizedStrings from 'react-localization';

import frioul from './images/home/frioul.webp';
import sailboat from './images/home/sailboat.webp';
import baie from './images/home/baie.webp';
import largasun from './images/home/largasun.webp';

const lang = new LocalizedStrings({
  en: {
    title: 'Larga II and its skipper Denis',
    undertitle: 'are welcoming you aboard',
    text: 'for all-year round sailing trips',
  },
  fr: {
    title: 'Larga II et son skipper Denis',
    undertitle: 'vous souhaitent la bienvenue à bord',
    text: "pour des sorties voiles loisir tout au long de l'année",
  },
});

//TODO : make a slider with selected images
export const images = [
  { src: largasun, alt: 'Larga II au coucher de soleil' },
  //   { src: frioul, alt: 'îles du Frioul' },
  //   { src: baie, alt: 'Baie' },
  //   { src: sailboat, alt: 'sailboat' },
];

export const content = { title: lang.title, undertitle: lang.undertitle, text: lang.text };
