import '@styles/NavbarStyles.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="nav-container">
        <section className='LeftNav'>
          <img src="SnapseIcon.png" alt="" className="logo" />
          <p>Monitoreo SNAPSE</p>
        </section>
        {/* Add the hamburger button */}
        <button type='button' className="actionButton" onClick={() => { }}>
          <div className="hamburger-icon"></div>
        </button>
        <section className='RightNav'>
          <a href='#'><img src="logoMon.png" alt="" className='logoMon' /></a>
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
