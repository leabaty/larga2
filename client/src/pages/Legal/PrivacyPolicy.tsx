import React from 'react';
import { content } from '../../contents/Legal/PrivacyPolicy';

import '../../styles/Legal.scss';

export default function PrivacyPolicy() {
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <hr />

      <p className='txt'>{content.intro}</p>

      {content.paragraphs && (
        <ul>
          {content.paragraphs.map((paragraph, index) => (
            <li key={index}>- {paragraph}</li>
          ))}
        </ul>
      )}

      <p className='txt'>{content.usage}</p>

      <p className='txt'>{content.access}</p>

      <p className='txt'>{content.withdraw}</p>

      <p className='txt'>{content.complaint}</p>

      <h3>{content.dataCollectionTitle}</h3>

      <p className='txt'>{content.dataCollection}</p>

      <p className='txt'>{content.mobileDeviceInfo}</p>

      <h3>{content.trackingTechnologies}</h3>

      {/* <p className="txt">{content.cookieUsage}</p> */}
      <p className='txt'>{content.noCookies}</p>
    </div>
  );
}
