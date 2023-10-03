import React from 'react';
import './NavbarStyles.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="nav-container">
        <section className='LeftNav'>
          <img src="SnapseIcon.png" alt="" className="logo"/>
          <p>Monitoreo SNAPSE</p>
        </section>
        <button type='button' className="actionButton"> </button>
        <section className='RigthNav'>
          <a href='#'><img src="logoMon.png" alt="" className='logoMon'/></a> {/*Boton de seccion de monitoreo e informacion con enlace*/}
          
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
