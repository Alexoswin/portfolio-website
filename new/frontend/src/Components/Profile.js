import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile({ scrollToSkills }) {
  const [displayedText, setDisplayedText] = useState('');
  const [step, setStep] = useState(0);
  

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



  return (
    <>
      
        <div className="container">
           <div className="floating-icons">
          <span className="tech-icon github"></span>
           <span className="tech-icon html"></span>
  <span className="tech-icon css"></span>
  <span className="tech-icon js"></span>
  <span className="tech-icon react"></span>
  <span className="tech-icon node"></span>
  <span className="tech-icon terminal"></span>
  <span className="tech-icon docker"></span>
  <span className="tech-icon flutter"></span>
  <span className="tech-icon mongo"></span>
<span className="tech-icon aws"></span>
<span className="tech-icon vscode"></span>
<span className="tech-icon java"></span>
<span className="tech-icon python"></span>
<span className="tech-icon figma"></span>
<span className="tech-icon linux"></span>
<span className="tech-icon mysql"></span>
      </div>
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
           <h5 className='Discription'>
        A Entry-level Software Developer skilled in MERN stack, AWS, and DevOps tools like Docker and Jenkins. Experienced in
        building scalable, data-driven apps using JavaScript, Python, and Java. Passionate about creating real-world solutions with
        clean code and agile practices.
        </h5>
        
      <br/>
        <div>
          <button className='btns'>
            View Resume
          </button>
        </div>
        
           
      </div>
     

      
      
    </>
  );
}