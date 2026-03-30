import { useRef } from 'react';
import Profile from './Profile';
import Skills from './Skill/Skills';
import Projects from './Project/Projects';
import EducationPage from './Education/EducationPage';
import Achievement from './Achievement/Achievement';
import './Home.css';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>Oswin Alex | Home - Software Developer Portfolio</title>
        <meta name="description" content="Welcome to the portfolio of Oswin Alex. Explore my projects, skills, and professional experience in software development." />
        <link rel="canonical" href="https://www.oswinalex.site/" />
      </Helmet>

      <div ref={topRef}></div>
      <div><Profile /></div>
      <EducationPage />
      <Skills />
      <Achievement />
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
