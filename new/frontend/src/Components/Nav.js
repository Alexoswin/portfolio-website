import React, { useState, useEffect } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

function Nav() {
  const token = Cookies.get('token');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  return (
    <nav className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink className="nav-logo" to="/">
          Oswin<span>Alex</span>
        </NavLink>

        <div className="nav-links-desktop">
          <NavLink className="nav-link-item" to="/">Home</NavLink>
          {!token && <NavLink className="nav-link-item" to="/Login">Login</NavLink>}
          {token && <NavLink className="nav-link-item" to="/Admin">Admin</NavLink>}
          <NavLink className="nav-link-item" to="/ContactMe">Contact</NavLink>
        </div>

        <button className="mobile-toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
          <span className="toggle-line"></span>
          <span className="toggle-line short"></span>
          <span className="toggle-line"></span>
        </button>

        <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="offcanvasNavbar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <div className="offcanvas-links">
              <NavLink className="offcanvas-link" to="/" onClick={closeOffcanvas}>Home</NavLink>
              <NavLink className="offcanvas-link" to="/Login" onClick={closeOffcanvas}>Login</NavLink>
              {token && <NavLink className="offcanvas-link" to="/Admin" onClick={closeOffcanvas}>Admin</NavLink>}
              <NavLink className="offcanvas-link" to="/ContactMe" onClick={closeOffcanvas}>Contact</NavLink>
            </div>
            
            <div className="offcanvas-socials">
              <p className="social-label">Find me on</p>
              <div className="social-grid">
                <a href="https://github.com/Alexoswin" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/oswin-alex-727773260/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://leetcode.com/u/Alexoswin/" target="_blank" rel="noreferrer">Leetcode</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;