// LoginForm.tsx

import React, { useEffect, useState } from 'react';
import './LoginFormStyles.css'; // Ruta al archivo de estilos
import { LoginAdmin } from '../services/admin.ts'
import axios from 'axios';
import { AuthData } from '../auth/authWrapper.tsx';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>('');
  const login = AuthData()?.login;
  const navigate = useNavigate();

  const fetch_login = async (admin: LoginAdmin) => {
    try {
      // Llamada a la API
      if (login !== undefined) {
        login(admin);
      } else {
        throw new Error('No se pudo iniciar sesión');
      }
      navigate('/protected');

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
      fetch_login({ email, contrasena });
    }
  }

  useEffect(() => {
    console.log("Login form mounted");
  }, []);

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
