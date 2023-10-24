import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlotOcupacion: React.FC = () => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4, 4, 4, 8, 9, 10],
          type: 'box',
          name: 'Guanaco',
          marker: { color: '#8884d8' }
        },
        {
          x: [1, 2, 3, 3, 3, 4, 8, 9, 10],
          type: 'box',
          name: 'Liebre europea',
          marker: { color: '#808080' }
        },
        {
          x: [1, 2, 3, 5, 5, 5, 8, 9, 10],
          type: 'box',
          name: 'Perro domestico',
          marker: { color: '#8884d8' }
        },
        {
          x: [1, 1, 1, 1, 2, 3, 5, 8, 10],
          type: 'box',
          name: 'Zorro chilla',
          marker: { color: '#808080' }
        },
        {
          x: [2, 3, 3, 3, 3, 5, 9, 10, 10],
          type: 'box',
          name: 'Zorro culpeo',
          marker: { color: '#808080' }
        }
      ]}
      layout={{ width: 500, height: 400, title: 'Ocupacion de sitio' }}
    />);
}

export default BoxPlotOcupacion;
