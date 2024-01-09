import LocalizedStrings from 'react-localization';

import { AgeLogo, DaysLogo, PaxLogo, ProgramLogo, WhenLogo, WhereLogo, CheckListLogo } from './images/bookingLogos';

// changes the program/the checklist depending on month (from may to october = summer)
const getCurrentProgram = () => {
  const currentMonth = new Date().getMonth() + 1;

  if (currentMonth >= 5 && currentMonth <= 10) {
    return { name: lang.summerProgram, img: ProgramLogo, additionalItems: lang.checkListSummer };
  } else {
    return { name: lang.winterProgram, img: ProgramLogo, additionalItems: lang.checkListWinter };
  }
};

const lang = new LocalizedStrings({
  en: {
    title: 'Your trip',
    pax: '1 to 6 passengers',
    age: 'from 18 to 99 years old',
    days: 'from Monday to Friday',
    where: 'Blue Coast, Frioul, Marseille',
    when: 'boarding at 10 am',
    winterProgram: 'lunch in a port or calanque',
    summerProgram: 'swimming & lunch in a calanque',
    checkListTitle: 'Checklist',
    checkList: ['waterproof clothes', 'soft-soled shoes (such as sneakers or rain boots)', 'snack & a bottle of water', 'sunscreen', 'sunglasses'],
    checkListSummer: ['a towel & a swimsuit', 'a cap'],
    checkListWinter: ['warm clothes, a beanie and winter gloves'],
  },

  fr: {
    title: 'Votre sortie',
    pax: '1 à 6 passagers',
    age: 'de 18 à 99 ans',
    days: 'du lundi au vendredi',
    where: 'Côte bleue, Frioul, Marseille',
    when: 'embarquement à 10h',
    winterProgram: 'déjeuner dans un port ou une calanque',
    summerProgram: 'baignade et déjeuner dans une calanque',
    checkListTitle: 'Check-List',
    checkList: [
      'vêtements imperméables',
      'chaussures à semelle souple (comme des baskets ou des bottes de pluie)',
      "casse-croûte & bouteille d'eau",
      'crème solaire',
      'lunettes de soleil',
    ],
    checkListSummer: ['une serviette et un maillot de bain', 'une casquette'],
    checkListWinter: ['des vêtements chauds, un bonnet & des gants'],
  },
});

const seasonalItems = getCurrentProgram();

export const content = {
  title: lang.title,
  tiles: [
    { name: lang.days, img: DaysLogo },
    { name: lang.when, img: WhenLogo },
    { name: lang.where, img: WhereLogo },
    { name: seasonalItems.name, img: seasonalItems.img },
    { name: lang.pax, img: PaxLogo },
    { name: lang.age, img: AgeLogo },
  ],
  checkListTitle: lang.checkListTitle,
  CheckListLogo,
  checkList: [...lang.checkList, ...seasonalItems.additionalItems],
};
