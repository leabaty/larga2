import LocalizedStrings from 'react-localization';

import { AgeLogo, DaysLogo, PaxLogo, ProgramLogo, WhenLogo, WhereLogo, CheckListLogo } from './images/bookingLogos';

const lang = new LocalizedStrings({
  en: {
    title: 'Your trip',
    pax: '1 to 6 passengers',
    age: 'from 18 to 99 years old',
    days: 'from Monday to Friday',
    where: 'Blue coast, Frioul, Marseille',
    when: 'Boarding at 10 am',
    winterProgram: 'lunch in a port or calanque',
    summerProgram: 'swimming & lunch in a calanque',
    checkListTitle: 'Checklist',
    checkList: ['waterproof clothes', 'soft-soled shoes (such as sneakers or rain boots)', 'snack', 'sunscreen'],
    note: "For our safety, all outings will be based on the day's weather report. Depending on the weather conditions, the captain may postpone the navigation or propose a non-stop navigation.",
  },

  fr: {
    title: 'Votre sortie',
    pax: '1 à 6 passagers',
    age: 'de 18 à 99 ans',
    days: 'du lundi au vendredi',
    where: 'Côte bleue, Frioul, Marseille',
    when: 'Embarquement à 10h',
    winterProgram: 'déjeuner dans un port ou une calanque',
    summerProgram: 'baignade et déjeuner dans une calanque',
    checkListTitle: 'Check-List',
    checkList: ['vêtements imperméables', 'chaussures à semelle souple (comme des baskets ou des bottes de pluie)', 'casse-croûte', 'crème solaire'],

    note: 'Pour notre sécurité, toutes les sorties seront basées sur le bulletin météo du jour. Selon les conditions météorologiques, le capitaine peut reporter la navigation ou proposer une navigation sans escale.',
  },
});

const getCurrentProgram = () => {
  const currentMonth = new Date().getMonth() + 1;

  if (currentMonth >= 5 && currentMonth <= 10) {
    return { name: lang.summerProgram, img: ProgramLogo };
  } else {
    return { name: lang.winterProgram, img: ProgramLogo };
  }
};

export const content = {
  title: lang.title,
  tiles: [
    { name: lang.pax, img: PaxLogo },
    { name: lang.age, img: AgeLogo },
    { name: lang.days, img: DaysLogo },
    { name: lang.where, img: WhereLogo },
    { name: lang.when, img: WhenLogo },
    getCurrentProgram(),
  ],
  checkListTitle: lang.checkListTitle,
  CheckListLogo,
  checkList: lang.checkList,
  note: lang.note,
};
