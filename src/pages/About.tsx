import React from 'react';

import '../styles/About.scss';
import Map from '../components/Map';
import { content } from '../contents/About';

export function About() {
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
          <div className='about-map-text'>
            {content.address.map((item, index) => (
              <p key={index}> {item} </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
