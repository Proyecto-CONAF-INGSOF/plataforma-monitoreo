// LoginForm.tsx

import React, { useState } from 'react';
import './LoginFormStyles.css'; // Ruta al archivo de estilos
import { LoginAdmin, loginAdmin } from '../services/admin.ts'
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>('');

  const login = async (admin: LoginAdmin) => {
    try {
      // Llamada a la API
      let status = await loginAdmin(admin);
      if (status === 200) {
        console.log("Login successful");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 200:
            setError('');
            break;
          case 400:
            setError('Usuario o contraseña incorrectos');
            break;
          case 401:
            setError('Usuario o contraseña incorrectos');
            break;
          default:
            setError('Error al iniciar sesión, intentelo más tarde');
            break;
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Handling submit");
    e.preventDefault();
    const email: string = (e.target as HTMLFormElement).username.value;
    const contrasena: string = (e.target as HTMLFormElement).password.value;

    if (email === '' || contrasena === '') {
      setError('Ingrese un usuario y contraseña');
    }
    else {
      setError('');
      login({ email, contrasena });
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="label">
          Usuario
        </label>
        <input type="text" placeholder="Nombre de usuario" id="username" name="username" required className="input" />

        <label htmlFor="password" className="label">
          Contraseña
        </label>
        <input type="password" placeholder="************" id="password" name="password" required className="input" />

        <button type="submit" className="button">
          Iniciar Sesión
        </button>
      </form>
      {error !== '' && <p className="error">{error}</p>}
      <a href="#" className="forgot-password-link">
        ¿Olvidó su contraseña?
      </a>
    </div>
  );
};

export default LoginForm;
