// LoginForm.tsx

import React from 'react';
import './LoginFormStyles.css'; // Ruta al archivo de estilos

const LoginForm: React.FC = () => {
  
  return (
    <div className="form-container">
      <form>
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
      <a href="#" className="forgot-password-link">
        ¿Olvidó su contraseña?
      </a>
    </div>
  );
};

export default LoginForm;
