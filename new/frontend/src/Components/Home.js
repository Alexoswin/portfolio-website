import  { useRef } from 'react';
import Profile from './Profile';
import Skills from './Skills';
import Projects from './Projects';
import './Home.css';

export default function Home() {
  const skillsRef = useRef(null);

  const scrollToSkills = () => {
    skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <div><Profile scrollToSkills={scrollToSkills} /> </div>
      <Profile scrollToSkills={scrollToSkills} />
      <div ref={skillsRef} className="skills-section">
        <Skills />
      </div>
      <div >
        <Projects />
      </div>
     
        
      
    </div>
  );
}