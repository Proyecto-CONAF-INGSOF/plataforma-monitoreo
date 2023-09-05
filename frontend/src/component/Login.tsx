// Login.tsx

import React from 'react';
import './loginStyle.css';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <img src="coipo.svg" id="guaren" alt="Guaren Image" />
      <LoginForm />
      <a href="#" className="forgot-password-link">
        ¿Olvidó su contraseña?
      </a>
    </div>
  );
};

export default Login;
