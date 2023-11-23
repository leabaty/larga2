import LocalizedStrings from 'react-localization';

import {
  HomeLogo,
  AboutLogo,
  ReservationLogo,
  GalleryLogo,
  ContactLogo,
} from './images/navbarLogos';

import { LargaWhiteLogo, LargaBlueLogo } from './images/largaLogo';

const lang = new LocalizedStrings({
  en: {
    home: 'Home',
    about: 'About',
    reservation: 'Reservation',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  fr: {
    home: 'Accueil',
    about: 'à propos',
    reservation: 'Réservation',
    gallery: 'Galerie',
    contact: 'Contact',
  },
});

export const navbarItems = [
  { name: lang.home, link: '/', img: HomeLogo },
  { name: lang.about, link: '/about', img: AboutLogo },
  { name: lang.reservation, link: '/reservation', img: ReservationLogo },
  { name: lang.gallery, link: '/gallery', img: GalleryLogo },
  { name: lang.contact, link: '/contact', img: ContactLogo },
];

// available : facebook, instagram
export const socialItems = [
  { name: 'facebook', link: 'https://www.facebook.com/larga.deux.9/' },
  // { name: 'instagram', link: 'https://www.facebook.com/larga.deux.9/' },
];

//TODO SVG rules explained here
export const Logo = LargaWhiteLogo;
