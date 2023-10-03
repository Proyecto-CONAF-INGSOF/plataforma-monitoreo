// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';
import Graph from './Graph';

const Content: React.FC = () => {
  return (
    <div className="content">
      {/* Contenido principal */}
      <Map />
      <Graph/>
      
    </div>
  );
};

export default Content;
