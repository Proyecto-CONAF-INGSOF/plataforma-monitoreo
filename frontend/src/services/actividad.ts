import axios from 'axios';

const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;


export interface Actividad {
  Hora: number;
  Act_den: number;
}

async function getActividad(unidad: string, anio: string, cod_specie: string): Promise<Actividad[]> {
  const url = `http://${ip}:${port}/fotomonitoreo/actividad/${unidad}/${anio}/${cod_specie}`;
  const { data } = await axios.get<Actividad[]>(url);
  return data;
}

async function fetchActividad(setActividad: (actividad: Actividad[]) => void, unidad: string, anio: string, cod_especie: string) {
  const actividad: Actividad[] = await getActividad(unidad, anio, cod_especie);
  setActividad(actividad);
}

export {
  getActividad,
  fetchActividad
}
