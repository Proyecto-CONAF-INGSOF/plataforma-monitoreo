import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../services/admin';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    // Llamamos a la función useAuth() que nos devuelve una promesa
    useAuth().then((isAuthed) => {
      // Si la promesa se resuelve correctamente, entonces seteamos el estado de authed
      setAuthed(isAuthed == true);
    });
  }, []);

  if (authed === null) {
    return null;
  }

  // Si authed es true, entonces renderizamos el componente que se le pasó como children
  return authed === true ? children : <Navigate to="/admin" replace />;
};

export default RequireAuth;
