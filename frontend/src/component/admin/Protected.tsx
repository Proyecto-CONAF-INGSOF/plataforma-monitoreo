import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Admin } from '@/auth/authWrapper';

// Random component to showcase the use of the protected route
const Protected: React.FC<{
  admin: Admin
  logout: () => void
}> = ({
  admin,
  logout
}) => {
    const navigate = useNavigate();

    const redirect_logout = () => {
      logout();
      navigate('/admin');
    };
    return (
      <div>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
        <button onClick={redirect_logout}>Logout {admin.nombre} {admin.apellido}</button>
      </div>
    );
  };

export default Protected;
