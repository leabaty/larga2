import LocalizedStrings from 'react-localization';

import icon from './images/sailboatIcon.png';

const lang = new LocalizedStrings({
  en: {
    poi: "We're meeting at the landing stage 2",
  },
  fr: {
    poi: 'RDV devant la Panne 2',
  },
});

export const content = {
  poi: lang.poi,
  icon,
  gpsMap: [43.32944, 5.15123],
  gpsPoi: [43.32945, 5.1517],
};
