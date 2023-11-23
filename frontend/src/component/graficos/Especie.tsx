import { RoseChartData } from '@/types';
import '@styles/Especie.css';
import React from 'react';
import RoseChart from './RoseChart';
import BoxPlotOcupacion from './BoxPlotOcupacion';
import { Ocupacion } from '@/services/ocupacion_sitio';

const Especie: React.FC<{
  seccionVisible: boolean,
  densidad: RoseChartData,
  frecuencia: RoseChartData,
  ocupacion: Ocupacion[],
  setChange: (dias: string, especie: number) => void,
}> = ({
  seccionVisible,
  densidad,
  frecuencia,
  ocupacion,
  setChange,
}) => {
    return (
      <div className="especie-container">
        {seccionVisible && (
          <>
            <div className="grafico">
              <RoseChart rs_data={densidad} />
            </div>
            <div className="grafico">
              <RoseChart rs_data={frecuencia} />
            </div>
            <div className="grafico">
              <BoxPlotOcupacion ocupacion={ocupacion} especie={1} setChange={setChange} />
            </div>
            <div className="grafico">
              <div>Placeholder</div>
            </div>
          </>
        )}
      </div>
    );
  };

export default Especie;
