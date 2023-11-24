import { RoseChartData } from '@/types';
import React from 'react';
import RoseChart from './RoseChart';
import OcupacionSitio from './OcupacionSitio';
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

            <OcupacionSitio
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
