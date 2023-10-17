import axios from 'axios';
import { RoseChartData } from '../types';

const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;


export interface Densidad {
  Hora: string;
  Act: number;
}


async function getDensidadHr(unidad: string, anio: string, cod_specie: string): Promise<Densidad[] | any> {
  const url = `http://${ip}:${port}/fotomonitoreo/actividad/${unidad}/${anio}/${cod_specie}`;

  try {
    const { data } = await axios.get<Densidad[]>(url);
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Error message: ", error.message);
    } else {
      console.log("Unexpected error: ", error);
    }
    return error;
  }
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
