

import SectionCard from './AdminComponents/SectionCard';

import './Admin.css';

export default function Admin() {
  return (
    <div className="dashboard">
          
          <img
            src="https://avatars.githubusercontent.com/u/100626688?v=4"
            alt="Profile"
            id="profileimg"
          />
        
      <div className="sections">
        <SectionCard title="Skills"/>
        <SectionCard title="Projects"/>
        <SectionCard title="Achievements"/>
        <SectionCard title="Education"/>
      </div>
    </div>
  );
}