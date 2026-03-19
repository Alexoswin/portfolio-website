import React from 'react';
import { NavLink } from 'react-router-dom';
import './ErrorPages.css';

const Forbidden = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-code">403</h1>
        <h2 className="error-title">Access Forbidden</h2>
        <p className="error-description">
          You don't have permission to access this page.
        </p>
        <div className="error-buttons">
          <NavLink to="/Login" className="error-home-btn login-btn">
            Login
          </NavLink>
          <NavLink to="/" className="error-home-btn">
            Go Back Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
