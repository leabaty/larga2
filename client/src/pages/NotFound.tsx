import React from 'react';

import '../styles/NotFound.scss';

import notfound from '../contents/images/notfound.webp';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='page notfound'>
      <h1>404</h1>

      <img className='notfound-img' src={notfound} alt='picture of a person on a boat looking through a telescope' />
      <h3>Oups, cette page n'existe pas... </h3>

      <Link to='/'>
        <button className='btn notfound-btn'> Revenir à l'accueil </button>
      </Link>
    </div>
  );
}
