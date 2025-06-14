import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';

export default function Profile({ scrollToSkills }) {
  const [displayedText, setDisplayedText] = useState('');
  const [step, setStep] = useState(0);
  const arrowRef = useRef(null);

  const fullText1 = "Hi..";
  const fullText2 = "I am Oswin Alex";

  useEffect(() => {
    let timeout;
    if (step === 0) {
      if (displayedText.length < fullText1.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText1.slice(0, displayedText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setStep(1), 1000);
      }
    } else if (step === 1) {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 100);
      } else {
        timeout = setTimeout(() => setStep(2), 500);
      }
    } else if (step === 2) {
      if (displayedText.length < fullText2.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText2.slice(0, displayedText.length + 1));
        }, 120);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, step]);

  const toggleArrow = () => {
  
    scrollToSkills();
  };

  return (
    <>
      <div className="container">
        <div className="profile-image-wrapper">
          <img
            src="https://avatars.githubusercontent.com/u/100626688?v=4"
            alt="Profile"
            className="profile-image"
          />
        </div>

        <div className="typing-text">
          {displayedText}
          <span className="cursor">|</span>
        </div>
      </div>

      <button className="arrow-btn" onClick={toggleArrow}>
        <div className="arrow" ref={arrowRef}></div>
      </button>
    </>
  );
}