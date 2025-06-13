

import SectionCard from './AdminComponents/SectionCard';

import './Admin.css';

export default function Admin() {
  return (
    <div className="dashboard">
  
      <div className="sections">
        <SectionCard title="Skills" />
        <SectionCard title="Projects" />
        <SectionCard title="Achievements" />
        <SectionCard title="Education" />
      </div>
    </div>
  );
}