import React, { useState, useEffect } from 'react';

import '@styles/SidebarStyles.css';
import { getRegiones, Region, Especie, Unidad, getUnidades, Anio, getAnios, getEspecies } from '@services/sidebar';
import { SidebarProps } from '@/types';

const Sidebar: React.FC<{ setSidebarProps: (newProps: SidebarProps) => void }>
  = (
    { setSidebarProps }
  ) => {
    // Nuestro default values de los selects
    const default_value = 'escoger';
    // Nuestro estado inicial de sidebar
    const [side_bar_props, SetSBP] = useState<SidebarProps>({
      region: default_value,
      unidad: default_value,
      anio: default_value,
      especie_1: default_value,
      especie_2: default_value,
      nombre_especie_1: '',
      nombre_especie_2: '',
    });
    // Nuestro estado de regiones, unidades, años y especies
    // Estos son sacados de la api conforme el usuario va seleccionando
    const [regiones, setRegiones] = useState<Region[]>([]);
    const [unidad, setUnidad] = useState<Unidad[]>([]);
    const [anios, setAnios] = useState<Anio[]>([]);
    const [especies, setEspecies] = useState<Especie[]>([]);

    // Llamadas a la API
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
    };

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
    };

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
    };

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
    };
    // Manejamos los cambios que el usuario puede hacer en sidebar
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.currentTarget.selectedIndex;
      const full_nombre = e.currentTarget.options[selected].textContent || '';
      const { name, value } = e.target;
      switch (name) {
        // Si la region cambia, queremos que todos los datos que dependen de la region se reseteen
        case 'region':
          SetSBP({
            region: value,
            unidad: default_value,
            anio: default_value,
            especie_1: default_value,
            especie_2: default_value,
            nombre_especie_1: '',
            nombre_especie_2: '',
          });
          fetchUnidades(value);
          break;
        // Si la unidad cambia, queremos que todos los datos que dependen de la unidad se reseteen
        case 'unit':
          SetSBP({
            ...side_bar_props,
            unidad: value,
            anio: default_value,
            especie_1: default_value,
            especie_2: default_value,
          });
          fetchAnios(side_bar_props.region, value);
          break;
        // Si el año cambia, queremos que todos los datos que dependen del año se reseteen
        case 'year':
          SetSBP({
            ...side_bar_props,
            anio: value,
            especie_1: default_value,
            especie_2: default_value,
          });
          fetchEspecies(side_bar_props.region, side_bar_props.unidad, value);
          break;
        // Si la especie 1 cambia, queremos que todos los datos que dependen de la especie 1 se reseteen
        case 'species_1':
          SetSBP({
            ...side_bar_props,
            especie_1: value,
            nombre_especie_1: full_nombre
          });
          break;
        // Si la especie 2 cambia, queremos que todos los datos que dependen de la especie 2 se reseteen
        case 'species_2':
          SetSBP({
            ...side_bar_props,
            especie_2: value,
            nombre_especie_2: full_nombre
          });
          break;
        // No hacer nada si no es ninguno de los anteriores
        default:
          break;
      }
    };
    // Cuando el usuario aprete el boton "Realizar análisis" esta funcion se ejecuta
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Verificamos que todos los datos esten seleccionados, si no, no hacemos nada
      if (side_bar_props.region == default_value || side_bar_props.unidad == default_value || side_bar_props.anio == default_value || side_bar_props.especie_1 == default_value || side_bar_props.especie_2 == default_value) {
        return;
      }
      // Acutalizamos el estado de sidebar_props para prograpagar los cambios a otros componentes
      setSidebarProps(side_bar_props);
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
              onChange={() => { }}
            />
            <p>Monitoreo estandarizado SNAPSE</p>
          </div>

          <div className="radio-container">
            <input
              type="radio"
              id="radio2"
              name="proyecto"
              value="Otros"
              onChange={() => { }}
            />
            <p>Otros</p>
          </div>
          <label htmlFor="region">Selecciona región:</label>
          <select name="region" id="region" onChange={handleChange} value={side_bar_props.region}>
            <option value={default_value} key={default_value} disabled>Escoger</option>
            {
              regiones.map((region) => (
                <option value={region.Ord_region} key={region.Ord_region}>{region.Nom_region}</option>
              ))
            }
          </select>
          <br />

          <label htmlFor="unit">Selecciona unidad SNAPSE:</label>
          <select name="unit" id="unit" onChange={handleChange} disabled={side_bar_props.region == default_value} value={side_bar_props.unidad}>
            <option value={default_value} key={default_value} disabled>Escoger</option>
            {
              unidad.map((unidad) => (
                <option value={unidad.Unidad_COD} key={unidad.Unidad_COD}>{unidad.Unidad}</option>
              ))
            }
          </select>
          <br />

          <label htmlFor="year">Selecciona año de monitoreo:</label>
          <select name="year" id="year" onChange={handleChange} disabled={side_bar_props.unidad == default_value} value={side_bar_props.anio}>
            <option value={default_value} key={default_value} disabled>Escoger</option>
            {
              anios.map((anio) => (
                <option value={anio.Ano} key={anio.Ano}>{anio.Ano}</option>
              ))
            }
          </select>
          <br />

          <label htmlFor="species_1">Selecciona Especie 1:</label>
          <select name="species_1" id="species_1" onChange={handleChange} disabled={side_bar_props.anio == default_value} value={side_bar_props.especie_1}>
            <option value={default_value} key={default_value} disabled>Escoger</option>
            {
              especies.map((especie) => (
                <option value={especie.Cod_especie} key={especie.Cod_especie} >{especie.Nom_comun}</option>
              ))
            }
          </select>
          <br />

          <label htmlFor="species_2">Selecciona Especie 2:</label>
          <select name="species_2" id="species_2" onChange={handleChange} disabled={side_bar_props.anio == default_value} value={side_bar_props.especie_2}>
            <option value={default_value} key={default_value} disabled>Escoger</option>
            {
              especies.map((especie) => (
                <option value={especie.Cod_especie} key={especie.Cod_especie}>{especie.Nom_comun}</option>
              ))
            }
          </select>
          <br />

          <button type="submit" disabled={side_bar_props.especie_1 == default_value || side_bar_props.especie_2 == default_value}
            // We Center the button using style
            style={{
              display: 'block',
              margin: 'auto'
            }}
          >Realizar análisis</button>
        </form>
      </div>
    );
  };

export default Sidebar;
