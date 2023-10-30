// Login.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

import '@styles/loginStyle.css';
import LoginForm from '@admin/LoginForm'

const Login: React.FC<{
  is_authenticated: boolean;
}> = (
  { is_authenticated }
) => {
    const component = <div className="login-container">
      <img src="coipo.svg" id="guaren" alt="Guaren Image" />
      <LoginForm />
    </div>
    // Si el usuario ya está autenticado, redirigirlo a la página protegida
    return is_authenticated === true ? <Navigate to="/protected" replace /> : component;
  };

export default Login;
