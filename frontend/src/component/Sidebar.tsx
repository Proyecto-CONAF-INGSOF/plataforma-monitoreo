import React from 'react';
import "./SidebarStyles.css";

const Sidebar: React.FC = () => {
  return (
    
      <div className="sidebar">
        <form>
          <label>Seleccion de proyecto</label>
          <input type="checkbox" />
          <p>Monitoreo estandarizado SNAPSE</p>
          <input type="checkbox" />
          <p>Otros</p>

          {/* Opciones de la casilla despegable */}
          <label>Selecciona región</label>
          <select name="region" id="region">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            {/* Agregar más opciones */}
          </select>
          <br />

          <label>Selecciona año de monitoreo</label>
          <select name="region" id="region">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            {/* Agregar más opciones */}
          </select>
          <br />

          <label>Selecciona unidad SNAPSE</label>
          <select name="unit" id="unit">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            {/* Agregar más opciones */}
          </select>
          <br />

          <label>Selecciona Especie 1</label>
          <select name="species_1" id="species_1">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            {/* Agregar más opciones */}
          </select>
          <br />

          <label>Selecciona Especie 2</label>
          <select name="species_2" id="species_2">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            {/* Agregar más opciones */}
          </select>
          <br />

          <button type="button">Realizar análisis</button>
        </form>
      </div>
    
  );
};

export default Sidebar;
