import React, { useState, useEffect } from 'react';
import './SidebarStyles.css';
import { getRegiones, Region, Especie, Unidad, getUnidades, Anio, getAnios, getEspecies } from '../services/sidebar';

interface SidebarProps {
  region: string;
  unidad: string;
  anio: string;
  especie_1: string;
  especie_2: string;
}

const Sidebar: React.FC = () => {
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [unidad, setUnidad] = useState<Unidad[]>([]);
  const [anios, setAnios] = useState<Anio[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);

  const [sidebarProps, setSidebarProps] = useState<SidebarProps>({
    region: '',
    unidad: '',
    anio: '',
    especie_1: '',
    especie_2: '',
  });

  const fetchRegiones = async () => {
    try {
      let r = await getRegiones();
      if (typeof r == 'string') {
        r = [];
      } else {
        setRegiones(r);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUnidades = async (region: string) => {
    try {
      let u = await getUnidades(region);
      if (typeof u == 'string') {
        u = [];
      } else {
        setUnidad(u);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAnios = async (region: string, unidad: string) => {
    try {
      let a = await getAnios(region, unidad);
      if (typeof a == 'string') {
        a = [];
      } else {
        setAnios(a);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchEspecies = async (region: string, unidad: string, anio: string) => {
    try {
      let e = await getEspecies(region, unidad, anio);
      if (typeof e == 'string') {
        e = [];
      } else {
        setEspecies(e);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
    switch (name) {
      case "region":
        setFormData({
          ...formData,
          "region": value,
          unit: '',
          year: '',
          species_1: '',
          species_2: '',
        });
        fetchUnidades(value);
        break;
      case "unit":
        setFormData({
          ...formData,
          "unit": value,
          year: '',
          species_1: '',
          species_2: '',
        });
        fetchAnios(formData["region"], value);
        break;
      case "year":
        setFormData({
          ...formData,
          "year": value,
          species_1: '',
          species_2: '',
        })
        fetchEspecies(formData["region"], formData["unit"], value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Puedes enviar los datos a un servidor aquí o realizar otras acciones.
  };
  useEffect(() => {
    fetchRegiones();
  }, []);

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
        <label htmlFor="region">Selecciona región:</label>
        <select name="region" id="region" onChange={handleChange}>
          <option value="" disabled selected>Escoger</option>
          {
            regiones.map((region) => (
              <option value={region.Ord_region}>{region.Nom_region}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="unit">Selecciona unidad SNAPSE:</label>
        <select name="unit" id="unit" onChange={handleChange} disabled={formData["region"] == ''}>
          <option value="" disabled selected>Escoger</option>
          {
            unidad.map((unidad) => (
              <option value={unidad.Unidad_COD}>{unidad.Unidad}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="year">Selecciona año de monitoreo:</label>
        <select name="year" id="year" onChange={handleChange} disabled={formData["unit"] == ""}>
          <option value="" disabled selected>Escoger</option>
          {
            anios.map((anio) => (
              <option value={anio.Ano}>{anio.Ano}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="species_1">Selecciona Especie 1:</label>
        <select name="species_1" id="species_1" onChange={handleChange} disabled={formData["year"] == ''}>
          <option value="" disabled selected>Escoger</option>
          {
            especies.map((especie) => (
              <option value={especie.Cod_especie}>{especie.Nom_comun}</option>
            ))
          }
        </select>
        <br />

        <label htmlFor="species_2">Selecciona Especie 2:</label>
        <select name="species_2" id="species_2" disabled={formData["year"] == ''} >
          <option value="" disabled selected>Escoger</option>
          {
            especies.map((especie) => (
              <option value={especie.Cod_especie}>{especie.Nom_comun}</option>
            ))
          }
        </select>
        <br />

        <button type="submit">Realizar análisis</button>
      </form>
    </div>
  );
};

export default Sidebar;
