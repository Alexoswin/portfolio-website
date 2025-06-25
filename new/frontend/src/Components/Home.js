import { useRef } from 'react';
import Profile from './Profile';
import Skills from './Skills';
import Projects from './Projects';
import './Home.css';

export default function Home() {
  const topRef = useRef(null);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <div ref={topRef}></div>
       <div><Profile /></div>
       
      <Skills />
    
      <Projects />
      

      {/* Scroll Down Button */}
      <button className="arrow-button down-arrow" onClick={scrollDown}>
       <div className='arrow'></div>
      </button>

      {/* Scroll Up Button */}
      <button className="arrow-button up-arrow" onClick={scrollToTop}>
        <div className='arrowdn'></div>
      </button>
    </div>
    
  );
}
