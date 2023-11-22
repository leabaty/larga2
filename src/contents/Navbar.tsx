import LocalizedStrings from 'react-localization';

import homeLogo from './images/home.svg';
import aboutLogo from './images/about.svg';
import reservationLogo from './images/reservation.svg';
import galleryLogo from './images/gallery.svg';
import contactLogo from './images/contact.svg';

import LargaBlueLogo from './images/larga2Blue';

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
  { name: lang.home, link: '/', img: homeLogo },
  { name: lang.about, link: '/about', img: aboutLogo },
  { name: lang.reservation, link: '/reservation', img: reservationLogo },
  { name: lang.gallery, link: '/gallery', img: galleryLogo },
  { name: lang.contact, link: '/contact', img: contactLogo },
];

// available : facebook, instagram
export const socialItems = [
  { name: 'facebook', link: 'https://www.facebook.com/larga.deux.9/' },
  // { name: 'instagram', link: 'https://www.facebook.com/larga.deux.9/' },
];

//TODO SVG rules explained here
export const Logo = LargaBlueLogo;
