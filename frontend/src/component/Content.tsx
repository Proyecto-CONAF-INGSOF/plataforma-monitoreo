import React, { useState } from 'react';
import './ContentStyle.css';
import Map from './Map';

const Content: React.FC = () => {
  const [seccion1Visible, setSeccion1Visible] = useState(false);
  const [seccion2Visible, setSeccion2Visible] = useState(false);

  return (
    <div className="content">
      {/* Contenido principal */}
      <Map />

      {/* Botón y contenido para la Sección 1 */}
      <div className={`separador ${seccion1Visible ? 'visible' : ''}`}>
        <button className="boton" onClick={() => setSeccion1Visible(!seccion1Visible)}>
          <img src="#" />
        </button>
        {seccion1Visible && (
          <div>
            <p>Metricas de la primera especie...</p>
          </div>
        )}
      </div>

      {/* Botón y contenido para la Sección 2 */}
      <div className={`separador ${seccion2Visible ? 'visible' : ''}`}>
        <button className="boton" onClick={() => setSeccion2Visible(!seccion2Visible)}>
        <img src="#" />
        </button>
        {seccion2Visible && (
          <div>
            <p>Meticas de la segunda especie...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
