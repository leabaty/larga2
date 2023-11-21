import React, { useState } from 'react';

import LocalizedStrings from 'react-localization';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import LargaBlueLogo from '../images/larga2Blue';
import homeLogo from '../images/home.svg';
import aboutLogo from '../images/about.svg';
import reservationLogo from '../images/reservation.svg';
import galleryLogo from '../images/gallery.svg';
import contactLogo from '../images/contact.svg';
import { FaFacebook } from "react-icons/fa";

export default function Navbar() {
  const navbarItems = [
    { name: lang.home, link: '/', img: homeLogo },
    { name: lang.about, link: '/about', img: aboutLogo },
    { name: lang.reservation, link: '/reservation', img: reservationLogo },
    { name: lang.gallery, link: '/gallery', img: galleryLogo },
    { name: lang.contact, link: '/contact', img: contactLogo },
  ];

  const [openedMobileMenu, setOpenMobileMenu] = useState(false);

  const handleClick = () => setOpenMobileMenu(!openedMobileMenu);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <div className='navbar'>
      {/* <div className='mobilemenu__navbar'>
        <div className='mobilemenu__logo'>
          <Link to='/' className='navbar__title' onClick={closeMobileMenu}>
            <FaPaw className='navbar__icon' alt='logo-lea-baty' />
          </Link>
        </div>

        <div className='mobilemenu__button' onClick={handleClick}>
          {openedMobileMenu ? <FaTimes /> : <HiOutlineMenuAlt3 />}
        </div>
      </div> */}

      <LargaBlueLogo size={'100'} />

      <div className='navbar-items'>
        {navbarItems.map((item, index) => (
                      <Link to={item.link} onClick={closeMobileMenu}>
          <div className='navbar-item' key={index}>

              <img className='navbar-icons'src={item.img} alt='icon' /> 
              <p>{item.name}</p>
          
          </div>
          </Link>
        ))}
      </div>

     <FaFacebook className='navbar-social'/>
    </div>
  );
}

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
