import React from 'react';
import { NavLink } from 'react-router-dom';
import './ErrorPages.css';

const NotFound = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-description">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <NavLink to="/" className="error-home-btn">
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
