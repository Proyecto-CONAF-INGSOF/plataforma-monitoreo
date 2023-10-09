// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';
import DensidadHoraria from './DensidadHoraria';
import BoxPlotOcupacion from './BoxPlotOcupacion';
import FreqHoraria from './FreqHoraria'
import Sidebar from './Sidebar';
import { SidebarProps } from '../types';


const Content: React.FC = () => {
  const [sidebar_props, setSidebarProps] = React.useState<SidebarProps>({
    region: "",
    unidad: "",
    anio: "",
    especie_1: "",
    especie_2: "",
    nombre_especie_1: "",
    nombre_especie_2: ""
  });

  function updateSidebarProps(newProps: SidebarProps) {
    setSidebarProps(newProps);
  }

  return (
    <>
      <Sidebar
        setSidebarProps={updateSidebarProps}
      />
      <div className="content">
        {/* Contenido principal */}
        <Map />
        {
          sidebar_props.region !== "" &&
          <>
            <DensidadHoraria
              sidebar_props={sidebar_props}
            />
            <FreqHoraria
              sidebar_props={sidebar_props}
            />
          </>
        }
        {
          sidebar_props.region !== "" &&
          <BoxPlotOcupacion />
        }
      </div>
    </>

  );
};

export default Content;
