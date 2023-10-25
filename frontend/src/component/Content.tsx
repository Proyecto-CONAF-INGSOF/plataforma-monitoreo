import React, { useEffect, useState } from 'react';
import './ContentStyle.css';
import Map from './Map';
import RoseChart from './RoseChart';
import Sidebar from './Sidebar';
import { RoseChartData, SidebarProps } from '../types';
import { fetchDensidad } from '../services/densidad_horaria';
import { fetchFreq } from '../services/freq_horaria';


const Content: React.FC = () => {
  const [seccion1Visible, setSeccion1Visible] = useState(false);
  const [seccion2Visible, setSeccion2Visible] = useState(false);

  const [sidebar_props, setSidebarProps] = React.useState<SidebarProps>({} as SidebarProps);
  // Densidad horaria para especie 1
  const [densidad_e1, setDensidadE1] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e1, setFreqE1] = React.useState<RoseChartData>({} as RoseChartData);

  // Densidad horaria para especie 2
  const [densidad_e2, setDensidadE2] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e2, setFreqE2] = React.useState<RoseChartData>({} as RoseChartData);

  function updateSidebarProps(newProps: SidebarProps) {
    setSidebarProps(newProps);
  }

  useEffect(() => {
    // Chequeamos que el sidebar tenga propiedades
    if (Object.keys(sidebar_props).length !== 0) {
      // Si el sidebar tiene propiedades, entonces hacemos las peticiones
      // Todo: Handle posibles errores al llamar a las funciones fetch. Estas pueden retornar errores de axios
      fetchDensidad(setDensidadE1, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1, sidebar_props.nombre_especie_1)
      fetchFreq(setFreqE1, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1, sidebar_props.nombre_especie_1)

      fetchDensidad(setDensidadE2, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_2, sidebar_props.nombre_especie_2)
      fetchFreq(setFreqE2, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_2, sidebar_props.nombre_especie_2)
    }
  }, [sidebar_props])

  return (
    <>
      <Sidebar
        setSidebarProps={updateSidebarProps}
      />
      <div className="content">
        {/* Contenido principal */}
        <Map />
        {
          sidebar_props.especie_1 !== undefined &&
          <div className={`separador ${seccion1Visible ? 'visible' : ''}`}>
            <button className="boton" onClick={() => setSeccion1Visible(!seccion1Visible)}>
              <img src="#" />
            </button>
            {seccion1Visible && (
              <div>
                {
                  sidebar_props.especie_1 !== undefined &&
                  <>
                    <RoseChart
                      rs_data={densidad_e1}
                      id='densidad-horaria-e1'
                    />

                    <RoseChart
                      rs_data={freq_e1}
                      id='freq-horaria-e1'
                    />
                  </>
                }
              </div>
            )}
          </div>
        }
        {
          sidebar_props.especie_2 !== undefined &&
          <div className={`separador ${seccion2Visible ? 'visible' : ''}`}>
            <button className="boton" onClick={() => setSeccion2Visible(!seccion2Visible)}>
              <img src="#" />
            </button>
            {seccion2Visible && (
              <div>
                {
                  sidebar_props.especie_2 !== undefined &&
                  <>
                    <RoseChart
                      rs_data={densidad_e2}
                      id='densidad-horaria-e2'
                    />

                    <RoseChart
                      rs_data={freq_e2}
                      id='freq-horaria-e2'
                    />
                  </>
                }
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default Content;
