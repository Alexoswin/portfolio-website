import React, { useEffect, useRef, useState } from 'react';
import './Achievementcard.css';

export default function Achievementcard({ name, Description, image, Date }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <> 
    <div className='Empty'></div>
    <div className="achievement-card-container" ref={cardRef}>
      <div className={`achievement-card ${isVisible ? 'active' : ''}`}>
        <div className="achievement-image-container">
          <img src={image} alt={name} className="achievement-image" />
          <div className="image-overlay"></div>
        </div>
        <div className="achievement-details">
          <h3 className="achievement-name">{name}</h3>
          <p className="achievement-description">{Description}</p>
          <div className="achievement-date-container">
            <svg className="date-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
            </svg>
            <p className="achievement-date">{Date}</p>
          </div>
        </div>
      </div>
    </div>
     <div className='Empty'></div>
    </>
  );
}