// Login.tsx

import React from 'react';
import '../component/loginStyle.css';
import LoginForm from '../component/LoginForm'

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <img src="coipo.svg" id="guaren" alt="Guaren Image" />
      <LoginForm />
    </div>
  );
};

export default Login;
