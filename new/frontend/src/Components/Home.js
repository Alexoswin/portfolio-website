import { useRef } from 'react';
import Profile from './Profile';
import Skills from './Skills';
import Projects from './Projects';
import './Home.css';

export default function Home() {
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToSkills = () => {
    skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <div><Profile scrollToSkills={scrollToSkills} /></div>

      <div ref={skillsRef} className="skills-section">
        <Skills scrollToProjects={scrollToProjects} />
      </div>

      <div ref={projectsRef}>
        <Projects />
      </div>
    </div>
  );
}
