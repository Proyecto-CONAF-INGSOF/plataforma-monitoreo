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
          <img src="logoMon.png" alt="" className='logoMon'/>
          
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
