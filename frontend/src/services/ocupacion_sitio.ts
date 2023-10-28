import axios from "axios";

// Importamos las variables de entorno definidas en el archivo .env
const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;

export interface Ocupacion {
  Dias: number;
  Naive: number;
  Ano: number;
  Superior: number;
  Inferior: number;
}

async function getOcupacion(unidad: string, dias: string, cod_especie: string): Promise<Ocupacion[]> {
  const url = `http://${ip}:${port}/fotomonitoreo/ocupacion_sitio/${unidad}/${dias}/${cod_especie}`;
  const { data } = await axios.get<Ocupacion[]>(url);
  return data;
}


async function fetchOcupacion(setOcupacion: (ocupacion: Ocupacion[]) => void, unidad: string, dias: string, cod_especie: string) {
  const ocupacion: Ocupacion[] = await getOcupacion(unidad, dias, cod_especie);

  setOcupacion(ocupacion);
}


export {
  getOcupacion,
  fetchOcupacion
}
