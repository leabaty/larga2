import React, { useState, useEffect } from 'react';
import '../styles/Navbar.scss';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { Logo, navbarItems, socialItems } from '../contents/Navbar';

interface IconMap {
  [key: string]: React.ComponentType;
}
const iconMap: IconMap = {
  facebook: FaFacebook as React.ComponentType,
  instagram: FaInstagram as React.ComponentType,
};

export default function Navbar() {
  // to be updated on scroll
  const logoColor = '#fff';

  const [openedMobileMenu, setOpenMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolling, setScrolling] = useState(false);

  const handleClick = () => setOpenMobileMenu(!openedMobileMenu);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 880);
    };

    const handleScroll = () => {
      setScrolling(window.scrollY > 80);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolling ? 'scrolling' : ''}`}>
      <div className={`navbar-container ${scrolling ? 'scrolling' : ''}`}>
        <Link to='/' onClick={closeMobileMenu}>
          <Logo size={isMobile || scrolling ? '75' : '100'} />
        </Link>

        <div className={isMobile ? 'navbar-btn' : 'hidden'} onClick={handleClick}>
          {openedMobileMenu ? <FaTimes /> : <HiOutlineMenuAlt3 />}
        </div>

        <div className={isMobile ? (openedMobileMenu ? 'navbar-items' : 'hidden') : 'navbar-items'}>
          {navbarItems.map((item, index) => (
            <Link className='navbar-item' to={item.link} onClick={closeMobileMenu} key={index}>
              {React.createElement(item.img, { color: logoColor, size: '20' })}
              <p className='navbar-text'>{item.name}</p>
            </Link>
          ))}

          {/* If the view is mobile, socials will be part of the navbar-items in order to appear in the mobile menu. */}
          <div className={isMobile ? 'navbar-socials' : 'hidden'}>
            <br />
            {socialItems.map((item, index) => {
              const IconComponent = iconMap[item.name];
              return (
                <a
                  className='navbar-social'
                  href={item.link}
                  target='_blank'
                  rel='noreferrer'
                  key={index}
                >
                  {IconComponent && <IconComponent />}
                </a>
              );
            })}
          </div>
        </div>

        {/* If the view is not mobile, socials will be displayed as an independent block on the navbar.*/}
        <div className={isMobile ? 'hidden' : 'navbar-socials'}>
          {socialItems.map((item, index) => {
            const IconComponent = iconMap[item.name];
            return (
              <a
                className='navbar-social'
                href={item.link}
                target='_blank'
                rel='noreferrer'
                key={index}
              >
                {IconComponent && <IconComponent />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
