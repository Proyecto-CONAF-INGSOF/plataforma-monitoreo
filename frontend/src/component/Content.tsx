// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';
import Graph from './Graph';
import BoxPlotOcupacion from './BoxPlotOcupacion';

const Content: React.FC = () => {
  return (
    <div className="content">
      {/* Contenido principal */}
      <Map />
      <Graph/>
      <BoxPlotOcupacion/>      
    </div>
  );
};

export default Content;
