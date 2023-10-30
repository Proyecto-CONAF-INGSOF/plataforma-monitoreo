import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import '@styles/LoginFormStyles.css'; // Ruta al archivo de estilos

import { LoginAdmin } from '@services/admin.ts'
import { AuthData } from '@/auth/authWrapper.tsx';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>('');
  const login = AuthData()?.login;
  const navigate = useNavigate();

  const fetch_login = async (admin: LoginAdmin) => {
    if (login !== undefined) {
      try {
        await login(admin);
        navigate('/protected');
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e.response?.status);
          switch (e.response?.status) {
            case 404:
              setError('Email o contraseña incorrectos');
              break;
            case 401:
              setError('Email o contraseña incorrectos');
              break;
            case 500:
              setError('Error al iniciar sesión, intentalo más tarde');
              break;
            default:
              setError('Error al iniciar sesión, intentalo más tarde');
              break;
          }
        } else {
          setError('Error desconocido');
        }
      }
    } else {
      throw new Error('No se pudo iniciar sesión');
    }

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Handling submit");
    e.preventDefault();
    const email: string = (e.target as HTMLFormElement).username.value;
    const contrasena: string = (e.target as HTMLFormElement).password.value;

    if (email === '' || contrasena === '') {
      setError('Ingrese un email y contraseña');
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
          Email
        </label>
        <input type="text" placeholder="Email" id="username" name="username" required className="input" />

        <label htmlFor="password" className="label">
          Contraseña
        </label>
        <input type="password" placeholder="************" id="password" name="password" required className="input" />

        <button type="submit" className="button">
          Iniciar Sesión
        </button>
        <div>
          <a href="#" className="forgot-password-link">
            ¿Olvidó su contraseña?
          </a>
          {error !== '' && <p className="error" style={{
            // Center the error message
            textAlign: 'center',
            // Set the color to red
            color: 'red',
            // Set the font size to 1.5rem
            fontSize: '0.9rem',
            // Avoid this message to displace the <a> tag
            marginBottom: '0',

          }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
