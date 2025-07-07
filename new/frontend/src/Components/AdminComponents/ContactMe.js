import { useState } from "react";
import "./Form.css"; // Same CSS as EducationForm
import Floatingicons from '../Floatingicons'

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with email logic
  };

  return (
    <div className="form-container">
        <Floatingicons/>
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Send Email</h3>

        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
         </svg>
          <input
            type="email"
            name="email"
            placeholder="Your Email ID"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
          </svg>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
            <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          </svg> Message </p>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="7"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
