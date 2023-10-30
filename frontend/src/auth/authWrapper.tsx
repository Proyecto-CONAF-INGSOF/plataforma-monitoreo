import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Route, Routes } from 'react-router-dom';

import { JWT, LoginAdmin } from '@services/admin';
import { loginAdmin } from '@services/admin';
import { JWTPayload } from '@/types';
import Protected from '@admin/Protected';

import Home from '@pages/Home';
import Login from '@pages/Login';

export type AuthContextType = {
  admin: Admin;
  login: (admin: LoginAdmin) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthData = () => useContext(AuthContext);

export interface Admin {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  is_authenticated: boolean;
}

export const AuthWrapper = () => {
  const [admin, setAdmin] = useState<Admin>({
    id: -1,
    nombre: '',
    apellido: '',
    email: '',
    is_authenticated: false,
  });

  const login = async (admin: LoginAdmin) => {
    const response = await loginAdmin(admin);
    if (response.status === 200) {
      const token = response.data as JWT;
      const jwt_payload = jwt_decode(token.access_token) as JWTPayload;
      localStorage.setItem('token', token.access_token);
      setAdmin({
        id: Number(jwt_payload.sub),
        nombre: jwt_payload.nombre,
        apellido: jwt_payload.apellido,
        email: jwt_payload.email,
        is_authenticated: true,
      });
    } else {
      throw new Error('No se pudo iniciar sesión');
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setAdmin({
      id: -1,
      nombre: '',
      apellido: '',
      email: '',
      is_authenticated: false,
    });
  };

  // Verificar si hay un token en el local storage, si lo hay, setear el admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt_payload = jwt_decode(token) as JWTPayload;
      // Check the expiration date
      if (jwt_payload.exp < Date.now() / 1000) {
        logout();
      } else {
        setAdmin({
          id: Number(jwt_payload.sub),
          nombre: jwt_payload.nombre,
          apellido: jwt_payload.apellido,
          email: jwt_payload.email,
          is_authenticated: true,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      <>
        <Routes>
          {/* Estas rutas no estan protegidas */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={
            <Login
              is_authenticated={admin.is_authenticated}
            ></Login>
          } />
          {/* Si el usuario está autenticado, mostrar la ruta /protected */}
          {
            admin.is_authenticated &&
            <Route
              path="/protected"
              element={
                <Protected
                  admin={admin}
                  logout={logout}
                ></Protected>
              }
            />
            ||
            <Route path="*" element={<h1>404</h1>} />
          }
        </Routes>
      </>
    </AuthContext.Provider >
  );

};
