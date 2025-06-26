// EducationPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EducationCard from './EducationCard';
import './EducationPage.css'; // Optional: styling

export default function EducationPage() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get('http://localhost:8000/educationdata'); // Adjust URL as needed
        setEducationList(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching education data:', err);
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <div className="education-page">
      <h2>Education</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        educationList.map((edu) => (
          <EducationCard key={edu._id} education={edu} />
        ))
      )}
    </div>
  );
}
