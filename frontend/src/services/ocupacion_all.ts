import axios from 'axios';

// Importamos las variables de entorno definidas en el archivo .env
const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;

export interface OcupacionAll {
  Dias: number;
  Naive: number;
  Ano: number;
  Superior: number;
  Inferior: number;
  Nom_comun: string;
}



async function getOcupacionAll(unidad: string, anio:number, dias:number): Promise<OcupacionAll[]> {
  const url = `http://${ip}:${port}/fotomonitoreo/ocupacion_full/${unidad}/${anio}/${dias}`;
  const { data } = await axios.get<OcupacionAll[]>(url);
  return data;
}


async function fetchOcupacionAll(setOcupacion: (ocupacion: OcupacionAll[]) => void, unidad: string, anio:number, dias: number) {
  const ocupacion: OcupacionAll[] = await getOcupacionAll(unidad, anio,dias);

  setOcupacion(ocupacion);
}


export {
  getOcupacionAll,
  fetchOcupacionAll
};
