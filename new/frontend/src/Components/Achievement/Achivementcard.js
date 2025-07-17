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
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="achievement-card-container" ref={cardRef}>
      <div className={`achievement-card ${isVisible ? 'active' : ''}`}>
        <div className="achievement-image-container">
          <img src={image} alt={name} className="achievement-image" />
        </div>
        <div className="achievement-details">
          <h3 className="achievement-name">{name}</h3>
          <p className="achievement-description">{Description}</p>
          <p className="achievement-date">{Date}</p>
        </div>
      </div>
    </div>
  );
}
