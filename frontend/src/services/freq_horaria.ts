import axios from 'axios';

const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;


export interface Frecuencia {
  Hora: string;
  Freq: number;
}

async function getFrecuencia(unidad: string, anio: string, cod_specie: string): Promise<Frecuencia[] | any> {
  let url = `http://${ip}:${port}/fotomonitoreo/freq_horaria/${unidad}/${anio}/${cod_specie}`;

  try {
    let { data } = await axios.get<Frecuencia[]>(url);
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


export {
  getFrecuencia
};
