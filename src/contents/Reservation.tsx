import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    title: 'Reservation',
  },

  fr: {
    title: 'Réservation',
  },
});

export const content = {
  title: lang.title,
};
