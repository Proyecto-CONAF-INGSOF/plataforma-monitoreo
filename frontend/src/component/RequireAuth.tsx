import { Navigate } from 'react-router-dom';
import { ReactNode, useState } from 'react';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState<boolean>(false);

  // Aquí se puede hacer una llamada a la API para verificar si el token es válido
  // Si el token es válido, entonces setAuthed(true)
  // Si el token no es válido, entonces setAuthed(false)
  setAuthed(true);

  // Si authed es true, entonces renderizamos el componente que se le pasó como children
  return authed === true ? children : <Navigate to="/admin" replace />;
};

export default RequireAuth;
