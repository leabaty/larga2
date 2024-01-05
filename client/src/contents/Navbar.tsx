import LocalizedStrings from 'react-localization';

import { HomeLogo, AboutLogo, BookingLogo, GalleryLogo, ContactLogo } from './images/navbarLogos';

import { LargaWhiteLogo, LargaBlueLogo } from './images/largaLogo';

const lang = new LocalizedStrings({
  en: {
    home: 'Home',
    about: 'About',
    booking: 'Booking',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  fr: {
    home: 'Accueil',
    about: 'à propos',
    booking: 'Réservation',
    gallery: 'Galerie',
    contact: 'Contact',
  },
});

export const navbarItems = [
  { name: lang.home, link: '/', img: HomeLogo },
  { name: lang.about, link: '/about', img: AboutLogo },
  { name: lang.booking, link: '/booking', img: BookingLogo },
  // { name: lang.gallery, link: '/gallery', img: GalleryLogo },
  { name: lang.contact, link: '/contact', img: ContactLogo },
];

// available : facebook, instagram
export const socialItems = [
  { name: 'facebook', link: 'https://www.facebook.com/larga.deux.9/' },
  // { name: 'instagram', link: 'https://www.facebook.com/larga.deux.9/' },
];

//TODO SVG rules explained here
/* SVGs have to be imported as components in order for them to be adaptable (size, color) */
export const Logo = LargaWhiteLogo;
