import axios from 'axios';

// Importamos las variables de entorno definidas en el archivo .env
const ip = import.meta.env.VITE_BACKEND_IP || 'localhost';
const port = import.meta.env.VITE_BACKEND_PORT || 8080;

export interface JWT {
  access_token: string;
  token_type: string;
}

export interface LoginAdmin {
  email: string;
  contrasena: string;
}

async function loginAdmin(admin: LoginAdmin): Promise<{ status: number, data: object }> {
  const form_data = new FormData();
  form_data.append('grant_type', 'password');
  form_data.append('username', admin.email);
  form_data.append('password', admin.contrasena);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const { status, data } = await axios.post(`http://${ip}:${port}/admin/login`, form_data, config);
  return { status, data };
}


export {
  loginAdmin,
};
