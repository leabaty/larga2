import LocalizedStrings from 'react-localization';

import boat from './images/about/_larga2.webp';
import skipper from './images/about/_denis.webp';

const lang = new LocalizedStrings({
  en: {
    title: 'About',
    boatTitle: 'Larga II',
    boatDesc: [
      'The Larga II is a Jeanneau Attalia 32-foot sailboat. It is a livable sailboat of 9.60 meters that can accommodate up to 6 people.',
      'It is typically rigged with a mainsail of ... m2 and a genoa of ... m2. It also has a spinnaker, a staysail, and a storm jib for rough weather.',
    ],
    skipperTitle: 'Denis',
    skipperDesc: [
      'As a passionate sailor, with numerous regattas and nautical miles under his belt, Denis now sets sail on his Larga 2 almost daily since acquiring it five years ago.',
      'He aspires to share his knowledge and good moments, to create memories together in the exceptional setting that the Mediterranean provides.',
    ],
    location: 'Find them in Carry-le-Rouet',
  },

  fr: {
    title: 'A propos',
    boatTitle: 'Larga II',
    boatDesc: [
      "Le Larga II est un Jeanneau Attalia 32 pieds. C'est Un voilier habitable de 9,60 m qui peut embarquer jusqu'à 6 personnes.",
      "Il est habituellement gréé d'une GV de ... m2 et d'un génois de ... m2.  Il dispose également d'un spi, d'une trinquette, d'un tri pour les gros temps. ",
    ],
    skipperTitle: 'Denis',
    skipperDesc: [
      'Navigateur passionné, avec de nombreuses régates et milles à son actif, Denis hisse à présent les voiles de son Larga 2 presque quotidiennement depuis son acquisition il y a cinq ans.',
      "Il aspire à partager connaissances et bons moments, à créer des souvenirs avec une diversité de personnes dans ce cadre exceptionnel qu'offre la méditerrannée.",
    ],
    location: 'Retrouvez-les à Carry-le-Rouet',
  },
});

export const content = {
  title: lang.title,
  articles: [
    {
      title: lang.boatTitle,
      desc: lang.boatDesc,
      img: { src: boat, alt: lang.boatTitle },
    },
    {
      title: lang.skipperTitle,
      desc: lang.skipperDesc,
      img: { src: skipper, alt: lang.skipperTitle },
    },
  ],
  location: lang.location,
  address: ['Panne 2', '43°19,7 N - 5°09,2 E', '13620 Carry-le-Rouet'],
};
