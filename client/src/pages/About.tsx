import React from 'react';

import '../styles/About.scss';
import Map from '../components/Map';
import { content } from '../contents/About';

export default function About() {
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <div className='about-articles'>
        {content.articles.map((item, index) => (
          <div className='about-article' key={index}>
            <h2>{item.title}</h2>
            <img className='about-article-img' src={item.img.src} alt={item.img.alt} />
            {item.desc.map((paragraph, index) => (
              <p className='about-article-txt' key={index}>
                {' '}
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <h2>{content.location}</h2>
      <div className='about-map'>
        <Map />

        <div className='about-map-info'>
          <a className='about-map-text' href='https://maps.app.goo.gl/4mKcS724iDhTCr5n6' target='_blank' rel='noreferrer'>
            {content.address.map((item, index) => (
              <p key={index}> {item} </p>
            ))}
          </a>
        </div>
      </div>
    </div>
  );
}
