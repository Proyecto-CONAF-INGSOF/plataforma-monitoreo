import React from 'react';
import Header from './Navbar'; // Asegúrate de que la ruta sea correcta
import Sidebar from './Sidebar';

const Monitoring = () => {
  return (
    <div>
      <Header />
      {/* Resto de tu código HTML y componentes */}
      <div className='container'>
        <Sidebar/>
      </div>
      <main>

      </main>

    </div>
  );
};

export default Monitoring;
