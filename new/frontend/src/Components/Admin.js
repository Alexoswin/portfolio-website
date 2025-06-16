import SectionCard from './AdminComponents/SectionCard';
import './Admin.css';

export default function Admin() {
  return (
    <div className="admin-container">
      
      {/* Sidebar for messages */}
      <div className="sidebar">
  <h3>Messages</h3>
  <div className="message-container">
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>
    <div className="message">
      <p> Email:</p>
      <p> Name:</p>
      Add new project section.
    </div>

    {/* Add more messages as needed */}
  </div>
</div>

      {/* Main dashboard */}
      <div className="dashboard">
        <img
          src="https://avatars.githubusercontent.com/u/100626688?v=4"
          alt="Profile"
          id="profileimg"
        />

        <div className="sections">
          <SectionCard title="Skills" />
          <SectionCard title="Projects" />
          <SectionCard title="Achievements" />
          <SectionCard title="Education" />
        </div>
      </div>
    </div>
  );
}
