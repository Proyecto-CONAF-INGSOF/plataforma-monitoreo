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
      <div>
        {
          seccionVisible &&
          <div className='contenedor2'>
            <div className='graficoDerecha'>
              <div className='header'>
                <div className='left'>
                  <h3 id='titulo'>Superposición de actividad horaria</h3>
                  <button className='informacion' ></button>
                </div>
                <div className='right'>
                  <button className='pliegue'></button>
                </div>
              </div>

              <RoseChart
                rs_data={densidad}
              />
            </div>

            <div className='graficoIzquierda'>
              <div className='header'>
                <div className='left'>
                  <h3 id='titulo'>Superposición de actividad horaria</h3>
                  <button className='informacion' ></button>
                </div>
                <div className='right'>
                  <button className='pliegue'></button>
                </div>
              </div>
              <RoseChart
                rs_data={frecuencia}
              />
            </div>

            <div className='graficoIzquierdaBajo'>
              <div className='header'>
                <div className='left'>
                  <h3 id='titulo'>Superposición de actividad horaria</h3>
                  <button className='informacion' ></button>
                </div>
                <div className='right'>
                  <button className='pliegue'></button>
                </div>
              </div>

              <BoxPlotOcupacion
                ocupacion={ocupacion}
                especie={1}
                setChange={setChange}
              />
            </div>
          </div>
        }
      </div>
    );
  };

export default Especie;
