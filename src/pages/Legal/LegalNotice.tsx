import React from 'react';

import './Legal.scss';
import LocalizedStrings from 'react-localization';

export default function LegalNotice() {
  const contactEmail = 'alexetana2023@gmail.com';
  const developerName = 'Léa Baty';
  const developerEmail = 'leabaty.dev@gmail.com';
  const hosting = 'OVH | Netlify | Fly.io';

  return (
    <div className='page'>
      <h1>{lang.title}</h1>
      <hr />

      <section className='legalnotice-section'>
        <h1>{lang.contact}</h1>
        <p>{contactEmail}</p>
      </section>

      <section className='legalnotice-section'>
        <h1>{lang.development}</h1>
        <p>
          {developerName} <br /> {developerEmail}
        </p>
      </section>

      <section className='legalnotice-section'>
        <h1>{lang.hosting}</h1>
        <p>{hosting}</p>
      </section>
    </div>
  );
}

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
