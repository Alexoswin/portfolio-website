import { useState } from 'react';
import axios from 'axios';
import './SkillsForm.css'; // 👈 import the CSS

export default function SkillsForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/skills', {
        name,
        image: [image], // wrap in array as per schema
      });

      setMessage('✅ Skill added successfully!');
      setName('');
      setImage('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add skill');
    }
  };

  return (
    <div className="skills-form-container">
      <form onSubmit={handleSubmit} className="skills-form-card">
        <h3>Add New Skill</h3>

        {message && <div className="form-message">{message}</div>}

        <label>Skill Name</label>
        <input
          type="text"
          placeholder="Enter skill name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>Image URL</label>
        <input
          type="text"
          placeholder="Paste image URL"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
