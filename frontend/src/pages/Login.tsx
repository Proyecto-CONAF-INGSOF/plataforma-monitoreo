// Login.tsx

import React from 'react';
import '../component/loginStyle.css';
import LoginForm from '../component/LoginForm'
import { Navigate } from 'react-router-dom';

const Login: React.FC<{
  is_authenticated: boolean;
}> = (
  { is_authenticated }
) => {
    let component = <div className="login-container">
      <img src="coipo.svg" id="guaren" alt="Guaren Image" />
      <LoginForm />
    </div>
    // Si el usuario ya está autenticado, redirigirlo a la página protegida
    return is_authenticated === true ? <Navigate to="/protected" replace /> : component;
  };

export default Login;
