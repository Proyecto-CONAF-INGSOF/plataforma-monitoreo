// Content.tsx

import React from 'react';
import './ContentStyle.css';
import Map from './Map';
import Graph from './Graph';
import BoxPlotOcupacion from './BoxPlotOcupacion';
import Sidebar from './Sidebar';
import { SidebarProps } from '../types';


const Content: React.FC = () => {
  const [sidebar_props, setSidebarProps] = React.useState<SidebarProps>({
    region: "",
    unidad: "",
    anio: "",
    especie_1: "",
    especie_2: "",
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
          <Graph
            sidebar_props={sidebar_props}
          />
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
