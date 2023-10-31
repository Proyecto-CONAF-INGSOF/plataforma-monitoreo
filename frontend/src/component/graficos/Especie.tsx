import { RoseChartData } from '@/types';
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
      <>
        {
          seccionVisible &&
          <>
            <RoseChart
              rs_data={densidad}
            />

            <RoseChart
              rs_data={frecuencia}
            />

            <BoxPlotOcupacion
              ocupacion={ocupacion}
              especie={1}
              setChange={setChange}
            />
          </>
        }
      </>
    );
  };

export default Especie;
