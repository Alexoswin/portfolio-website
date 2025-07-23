import SectionCard from './SectionCard';
import './Admin.css';
import { useState, useEffect } from 'react';



export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Simulate loading messages (replace with actual API call)
  useEffect(() => {
    const dummyMessages = Array(10).fill().map((_, i) => ({
      id: i + 1,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      content: 'Add new project section.daskldnaklsjdo ankd fnandk asknianskl ai kmasojdoass oajdl ald lasl dlmdasldm lls mdalsjmd',
      date: new Date(Date.now() - i * 3600000).toLocaleString(),
      read: false
    }));
    setMessages(dummyMessages);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };



  return (
    <div className="admin-container">
     
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        {sidebarOpen ? '✕ Close' : '☰ Messages'}
        {messages.some(m => !m.read) && <span className="unread-badge"></span>}
      </button>
      
      {/* Backdrop - only visible on mobile when sidebar is open */}
      <div 
        className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />
      
      {/* Sidebar for messages */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h4><b>Messages</b></h4>
          <span className="message-count">{messages.length} messages</span>
        </div>
       
        <div className="message-container">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.read ? '' : 'unread'}`}
             
            >
              <div className="message-header">
                <p className="message-sender">{message.name} &lt;{message.email}&gt;</p>
                <p className="message-date">{message.date}</p>
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main dashboard */}
      <div className="dashboard">
        <div className="profile-sec">
          <img
            src="https://avatars.githubusercontent.com/u/100626688?v=4"
            alt="Profile"
            id="profileimg"
          />
          <h4><b>Oswin Alex</b></h4>
          <p className="admin-role">Administrator</p>
        </div>

      <div className="section">
        <SectionCard title={<>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
          </svg> Skills</>} addPath={"/Admin/SkillForm"} deletePath={"/Admin/deleteSkills"} />
        <SectionCard title={<>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
          </svg> Projects</>} addPath={"/Admin/ProjectForm"} deletePath={"/Admin/deleteProject"} />
        <SectionCard title={<>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
          </svg> Achievements</>} addPath={"/Admin/AchievementsForm"} deletePath={"/Admin/deleteAchievements"} />
        <SectionCard title={<>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
          </svg> Education</>} addPath={"/Admin/EducationForm"} deletePath={"/Admin/DeleteEducation"} />

        <SectionCard title={<><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-award-fill" viewBox="0 0 16 16">
        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z"/>
       <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
        </svg> Certification</>} addPath={"/Admin/CertificationForm"} deletePath={"/Admin/DeleteCertification"} />

        <SectionCard title={<><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
        </svg> Summary</>} addPath={"/Admin/SummaryForm"} deletePath={"/Admin/DeleteSummary"} />


      </div>

      </div>
    </div>
  );
}