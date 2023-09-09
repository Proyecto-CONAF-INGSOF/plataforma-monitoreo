import React from 'react';
import './SidebarStyles.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <form>
        <label>Seleccion de proyecto:</label>
        <div className="radio-container">
          <input type="radio" id="radio1" name="proyecto"/>
          <p>Monitoreo estandarizado SNAPSE</p>
        </div>
        
        <div className="radio-container">
          <input type="radio" id="radio2" name="proyecto"/>
          <p>Otros</p>
        </div>

        {/* Opciones de la casilla despegable */}
        <label htmlFor="region">Selecciona región:</label>
        <select name="region" id="region">
          <option value="arica">Arica</option>
          <option value="otra">Otra región</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="year">Selecciona año de monitoreo:</label>
        <select name="year" id="year">
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="unit">Selecciona unidad SNAPSE:</label>
        <select name="unit" id="unit">
          <option value="unidad1">Unidad 1</option>
          <option value="unidad2">Unidad 2</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="species_1">Selecciona Especie 1:</label>
        <select name="species_1" id="species_1">
          <option value="especie1">Especie 1</option>
          <option value="especie2">Especie 2</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="species_2">Selecciona Especie 2:</label>
        <select name="species_2" id="species_2">
          <option value="especie3">Especie 3</option>
          <option value="especie4">Especie 4</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <button type="button">Realizar análisis</button>
      </form>
    </div>
  );
};

export default Sidebar;
