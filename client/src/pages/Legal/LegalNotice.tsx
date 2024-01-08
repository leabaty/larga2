import React from 'react';
import { content } from '../../contents/Legal/LegalNotice';

import '../../styles/Legal.scss';

export default function LegalNotice() {
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <hr />

      <div className='legal-pg'>
        <h3>{content.contact}</h3>
        <p>{content.contactEmail}</p>
      </div>

      <div className='legal-pg'>
        <h3>{content.development}</h3>
        <p>
          {content.developerName} | {content.developerEmail}
        </p>
      </div>

      <div className='legal-pg'>
        <h3>{content.hosting}</h3>
        <p>{content.hostingData}</p>
      </div>
    </div>
  );
}
