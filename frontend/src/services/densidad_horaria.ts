import axios from 'axios';

const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;


export interface Actividad {
  Hora: string;
  Act: number;
}

async function getActividad(unidad: string, anio: string, cod_specie: string): Promise<Actividad[] | any> {
  let url = `http://${ip}:${port}/fotomonitoreo/actividad/${unidad}/${anio}/${cod_specie}`;

  try {
    let { data } = await axios.get<Actividad[]>(url);
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
  getActividad
};
