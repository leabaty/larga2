import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    title: 'Legal Notice',
    contact: 'Contact',
    development: 'Design & Development',
    hosting: 'Hosting and Domain',
  },
  fr: {
    title: 'Mentions Légales',
    contact: 'Contact',
    development: 'Design & développement',
    hosting: 'Hébergement du site et enregistrement domaine',
  },
});

export const content = {
  title: lang.title,
  contact: lang.contact,
  development: lang.development,
  hosting: lang.hosting,
  contactEmail: 'sorties.larga2@gmail.com',
  developerName: 'Léa Baty',
  developerEmail: 'leabaty.dev@gmail.com',
  hostingData: 'OVH | Netlify | Vercel',
};
