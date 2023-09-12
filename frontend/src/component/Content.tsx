// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';

const Content: React.FC = () => {
  return (
    <div className="content">
      {/* Contenido principal */}
      <Map />
    </div>
  );
};

export default Content;
