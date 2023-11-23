import React from 'react';

import '../styles/Home.scss';

import { content, coverImages } from '../contents/Home';
function Home() {
  return (
    <>
      <div className='home-content'>
        {coverImages.map((item, index) => (
          <img key={index} className='home-img' src={item.src} alt={item.alt} />
        ))}
        <div className='home-text'>
          <h1>{content.title}</h1>
          <h2>{content.undertitle}</h2>
          <h3>{content.text}</h3>
        </div>
      </div>
    </>
  );
}

export default Home;
