import React, { useEffect } from 'react';
import { useState } from 'react';

import '@styles/ContentStyle.css';
import { RoseChartData, SidebarProps } from '@/types';

import { fetchDensidad } from '@services/densidad_horaria';
import { fetchFreq } from '@services/freq_horaria';
import { Ocupacion, fetchOcupacion } from '@services/ocupacion_sitio';
import { Actividad, fetchActividad } from '@services/actividad';

import Superposicion from '@graficos/Superposicion';
import Especie from '@graficos/Especie';

import Map from '@component/Map';
import Sidebar from '@component/Sidebar';
import ButtonEspecie from '@component/ButtonEspecie';


const Content: React.FC = () => {
  // Botones especies
  const [seccion1Visible, setSeccion1Visible] = useState(false);
  const [seccion2Visible, setSeccion2Visible] = useState(false);

  // Sidebar
  const [sidebar_props, setSidebarProps] = React.useState<SidebarProps>({} as SidebarProps);

  // Especie 1
  const [densidad_e1, setDensidadE1] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e1, setFreqE1] = React.useState<RoseChartData>({} as RoseChartData);
  const [ocupacion_e1, setOcupacionE1] = React.useState<Ocupacion[]>([] as Ocupacion[]);
  const [actividad_e1, setActividadE1] = React.useState<Actividad[]>([] as Actividad[]);

  // Especie 2
  const [densidad_e2, setDensidadE2] = React.useState<RoseChartData>({} as RoseChartData);
  const [freq_e2, setFreqE2] = React.useState<RoseChartData>({} as RoseChartData);
  const [ocupacion_e2, setOcupacionE2] = React.useState<Ocupacion[]>([] as Ocupacion[]);
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

          <div className='contenedor'>
            <div className='graficoIzquierda'>

            </div>
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

              <Superposicion
                actividad1={actividad_e1}
                actividad2={actividad_e2}
                nombre_especie_1={sidebar_props.nombre_especie_1}
                nombre_especie_2={sidebar_props.nombre_especie_2}
              ></Superposicion>

            </div>
          </div>

        }
        <ButtonEspecie
          especie={sidebar_props.especie_1}
          seccion_visible={seccion1Visible}
          setSeccion={setSeccion1Visible}
        />
        {
          sidebar_props.especie_1 !== undefined &&
          < Especie
            seccionVisible={seccion1Visible}
            densidad={densidad_e1}
            frecuencia={freq_e1}
            ocupacion={ocupacion_e1}
            setChange={setChange}
          />
        }
        <ButtonEspecie
          especie={sidebar_props.especie_2}
          seccion_visible={seccion2Visible}
          setSeccion={setSeccion2Visible}
        />
        {
          sidebar_props.especie_2 !== undefined &&
          <Especie
            seccionVisible={seccion2Visible}
            densidad={densidad_e2}
            frecuencia={freq_e2}
            ocupacion={ocupacion_e2}
            setChange={setChange}
          />
        }
      </div>
    </>
  );
};

export default Content;
