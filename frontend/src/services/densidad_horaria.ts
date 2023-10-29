import axios from 'axios';
import { RoseChartData } from '../types';

const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;


export interface Densidad {
  Hora: string;
  Act: number;
}


async function getDensidadHr(unidad: string, anio: string, cod_specie: string): Promise<Densidad[]> {
  console.log(unidad, anio, cod_specie);
  const url = `http://${ip}:${port}/fotomonitoreo/densidad_horaria/${unidad}/${anio}/${cod_specie}`;

  const { data } = await axios.get<Densidad[]>(url);
  return data;
}

async function fetchDensidad(setDensidad: (densidad: RoseChartData) => void, unidad: string, anio: string, cod_especie: string, nombre_especie: string) {
  const densidad: Densidad[] = await getDensidadHr(unidad, anio, cod_especie);
  const data: RoseChartData = {
    categories: densidad.map(d => d.Hora),
    data: densidad.map(d => d.Act),
    title: `Densidad horaria - ${nombre_especie}`,
    subtitle: "Act"
  }
  setDensidad(data);
}


export {
  getDensidadHr,
  fetchDensidad
};
