import axios from "axios";

// Importamos las variables de entorno definidas en el archivo .env
const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;

export interface LoginAdmin {
  email: string;
  contrasena: string;
}

async function loginAdmin(admin: LoginAdmin) {
  try {
    let { data, status } = await axios.post(`http://${ip}:${port}/admin/login`, admin)
    return status;
  } catch (error) {
    return error
  }
}

export {
  loginAdmin
}