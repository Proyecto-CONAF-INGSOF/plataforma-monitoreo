import React, { useState } from 'react';
import './SidebarStyles.css';

const Sidebar: React.FC = () => {
  const [formData, setFormData] = useState({
    proyecto: '',
    region: '',
    year: '',
    unit: '',
    species_1: '',
    species_2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Puedes enviar los datos a un servidor aquí o realizar otras acciones.
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <label>Seleccion de proyecto:</label>
        <div className="radio-container">
          <input
            type="radio"
            id="radio1"
            name="proyecto"
            value="Monitoreo estandarizado SNAPSE"
            onChange={handleChange}
          />
          <p>Monitoreo estandarizado SNAPSE</p>
        </div>

        <div className="radio-container">
          <input
            type="radio"
            id="radio2"
            name="proyecto"
            value="Otros"
            onChange={handleChange}
          />
          <p>Otros</p>
        </div>

        {/* Opciones de la casilla despegable */}
        <label htmlFor="region">Selecciona región:</label>
        <select name="region" id="region" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          <option value="arica">Arica</option>
          <option value="otra">Otra región</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="year">Selecciona año de monitoreo:</label>
        <select name="year" id="year" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="unit">Selecciona unidad SNAPSE:</label>
        <select name="unit" id="unit" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          <option value="unidad1">Unidad 1</option>
          <option value="unidad2">Unidad 2</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="species_1">Selecciona Especie 1:</label>
        <select name="species_1" id="species_1" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          <option value="especie1">Especie 1</option>
          <option value="especie2">Especie 2</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <label htmlFor="species_2">Selecciona Especie 2:</label>
        <select name="species_2" id="species_2" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          <option value="especie3">Especie 3</option>
          <option value="especie4">Especie 4</option>
          {/* Agregar más opciones */}
        </select>
        <br />

        <button type="submit">Realizar análisis</button>
      </form>
    </div>
  );
};

export default Sidebar;
