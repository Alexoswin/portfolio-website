import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="neon-arc"></div>
                <img src="/logo.png" alt="App Logo" className="loader-logo" />
            </div>
        </div>
    );
};

export default Loader;
