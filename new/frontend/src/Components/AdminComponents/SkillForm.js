import { useState } from 'react';
import axios from 'axios';
import './Form.css'; // Your existing CSS file
import { fileToBase64 } from '../fileToBase64';
import Cookies from 'js-cookie';

export default function SkillsForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
   const token = Cookies.get('token');
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("❌ Please upload an image.");
      return;
    }

    try {
      const base64Image = await fileToBase64(image);

      await axios.post('http://localhost:8000/AddSkill', {
        name,
        image: [base64Image], // Send as array to match schema
      },
     {
            headers: {
              Authorization: token,}
            
            });

      setMessage('✅ Skill added successfully!');
      setName('');
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add skill');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h3>Add New Skill</h3>

        {message && <div className="message">{message}</div>}

        {/* Skill Name Input */}
        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lightbulb-fill" viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
          </svg>
          <input
            type="text"
            placeholder="Enter skill name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="input-group">
          <label htmlFor="file-upload" className="custom-file-upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
            </svg>
            {image ? image.name : 'Choose image'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
