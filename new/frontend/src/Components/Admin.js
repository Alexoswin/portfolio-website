import SectionCard from './AdminComponents/SectionCard';
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
        <div className="profile-section">
          <img
            src="https://avatars.githubusercontent.com/u/100626688?v=4"
            alt="Profile"
            id="profileimg"
          />
          <h4><b>Oswin Alex</b></h4>
          <p className="admin-role">Administrator</p>
        </div>

        <div className="sections">
          <SectionCard title="Skills" icon="💡" />
          <SectionCard title="Projects" icon="📂" />
          <SectionCard title="Achievements" icon="🏆" />
          <SectionCard title="Education" icon="🎓" />
        </div>
      </div>
    </div>
  );
}