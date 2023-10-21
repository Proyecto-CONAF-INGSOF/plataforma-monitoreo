// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';
import FrecuencyChart from './FrequencyChart';
import DensityChart from './DensityChart';

const Content: React.FC = () => {
  return (
    <div className="content">
      {/* Contenido principal */}
      <Map />
      <FrecuencyChart/>
      <DensityChart/>
    </div>
  );
};

export default Content;
