import React from 'react';
import './NavbarStyles.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <img src="forestin.svg" id="forestin" alt="Forestin Logo" />
          <li className="monitoreo">Monitoreo SNAPSE</li> {/* Asigna clases CSS */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
