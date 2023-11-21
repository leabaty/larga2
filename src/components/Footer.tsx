import React from 'react';
import { Link } from 'react-router-dom';

import LocalizedStrings from 'react-localization';
import './Footer.scss';

export default function Footer() {
  return (
    <>
      <div className='footer-container'>
        <Link className='footer-link' to='/legal-notice'>
          {lang.legalNotice}
        </Link>
        <Link className='footer-link' to='/privacy-policy'>
          {lang.privacyPolicy}
        </Link>
      </div>
    </>
  );
}

const lang = new LocalizedStrings({
  en: {
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
  },
  fr: {
    legalNotice: 'Mentions Légales',
    privacyPolicy: 'Politique de confidentialité',
  },
});
