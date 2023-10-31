import React, { useEffect } from 'react';
import { useState } from 'react';

import '@styles/ContentStyle.css';
import { RoseChartData, SidebarProps } from '@/types';

import { fetchDensidad } from '@services/densidad_horaria';
import { fetchFreq } from '@services/freq_horaria';
import { Ocupacion, fetchOcupacion } from '@services/ocupacion_sitio';
import { Actividad, fetchActividad } from '@services/actividad';

import Superposicion from '@graficos/Superposicion';
import RoseChart from '@graficos/RoseChart';
import BoxPlotOcupacion from '@graficos/BoxPlotOcupacion';

import Map from '@component/Map';
import Sidebar from '@component/Sidebar';


const Content: React.FC = () => {
  // Botones para mostrar/ocultar secciones
  const [seccion1Visible, setSeccion1Visible] = useState(false);
  const [seccion2Visible, setSeccion2Visible] = useState(false);

  const [sidebar_props, setSidebarProps] = React.useState<SidebarProps>({} as SidebarProps);
  // Densidad horaria para especie 1
  const [densidad_e1, setDensidadE1] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e1, setFreqE1] = React.useState<RoseChartData>({} as RoseChartData);
  // Ocupacion de sitio especie 1
  const [ocupacion_e1, setOcupacionE1] = React.useState<Ocupacion[]>([] as Ocupacion[]);
  // Actividad especie 1
  const [actividad_e1, setActividadE1] = React.useState<Actividad[]>([] as Actividad[]);

  // Densidad horaria para especie 2
  const [densidad_e2, setDensidadE2] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e2, setFreqE2] = React.useState<RoseChartData>({} as RoseChartData);
  // Ocupacion de sitio especie 2
  const [ocupacion_e2, setOcupacionE2] = React.useState<Ocupacion[]>([] as Ocupacion[]);
  // Actividad especie 2
  const [actividad_e2, setActividadE2] = React.useState<Actividad[]>([] as Actividad[]);



  function updateSidebarProps(newProps: SidebarProps) {
    setSidebarProps(newProps);
  }

  useEffect(() => {
    // Chequeamos que el sidebar tenga propiedades
    if (Object.keys(sidebar_props).length !== 0) {
      // Si el sidebar tiene propiedades, entonces hacemos las peticiones
      // Todo: Handle posibles errores al llamar a las funciones fetch. Estas pueden retornar errores de axios
      fetchDensidad(setDensidadE1, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1, sidebar_props.nombre_especie_1);
      fetchFreq(setFreqE1, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1, sidebar_props.nombre_especie_1);
      fetchOcupacion(setOcupacionE1, sidebar_props.unidad, '30', sidebar_props.especie_1);
      fetchActividad(setActividadE1, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_1);

      fetchDensidad(setDensidadE2, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_2, sidebar_props.nombre_especie_2);
      fetchFreq(setFreqE2, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_2, sidebar_props.nombre_especie_2);
      fetchOcupacion(setOcupacionE2, sidebar_props.unidad, '30', sidebar_props.especie_2);
      fetchActividad(setActividadE2, sidebar_props.unidad, sidebar_props.anio, sidebar_props.especie_2);
    }
  }, [sidebar_props]);

  const setChange = (dias: string, especie: number) => {
    if (especie === 1) {
      fetchOcupacion(setOcupacionE1, sidebar_props.unidad, dias, sidebar_props.especie_1);
    } else if (especie === 2) {
      fetchOcupacion(setOcupacionE2, sidebar_props.unidad, dias, sidebar_props.especie_2);
    }
  };

  return (
    <>
      <Sidebar setSidebarProps={updateSidebarProps} />
      <div className="content">
        <Map />
        {
          sidebar_props.especie_1 !== undefined &&
          sidebar_props.especie_2 !== undefined &&
          <Superposicion
            actividad1={actividad_e1}
            actividad2={actividad_e2}
            nombre_especie_1={sidebar_props.nombre_especie_1}
            nombre_especie_2={sidebar_props.nombre_especie_2}
          ></Superposicion>
        }
        {
          sidebar_props.especie_1 !== undefined &&
          <div className={`separador ${seccion1Visible ? 'visible' : ''}`}>
            <button className="boton" onClick={() => setSeccion1Visible(!seccion1Visible)}>
              <img src={`/icons/${sidebar_props.especie_1}.png`} style={{
                height: '100%',
              }} />
            </button>
          </div>
        }
        {
          seccion1Visible &&
          sidebar_props.especie_1 !== undefined &&
          <>
            <RoseChart
              rs_data={densidad_e1}
            />

            <RoseChart
              rs_data={freq_e1}
            />

            <BoxPlotOcupacion
              ocupacion={ocupacion_e1}
              especie={1}
              setChange={setChange}
            />
          </>
        }
        {
          sidebar_props.especie_2 !== undefined &&
          <div className={`separador ${seccion2Visible ? 'visible' : ''}`}>
            <button className="boton" onClick={() => setSeccion2Visible(!seccion2Visible)}>
              <img src={`/icons/${sidebar_props.especie_2}.png`} style={{
                height: '100%',
              }} />
            </button>
          </div>
        }
        {
          seccion2Visible &&
          sidebar_props.especie_2 !== undefined &&
          <>
            <RoseChart
              rs_data={densidad_e2}
            />
            <RoseChart
              rs_data={freq_e2}
            />
            <BoxPlotOcupacion
              ocupacion={ocupacion_e2}
              especie={2}
              setChange={setChange}
            />
          </>
        }
      </div>
    </>
  );
};

export default Content;
