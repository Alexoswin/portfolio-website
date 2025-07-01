// EducationCard.js
import React from 'react';
import './EducationCard.css'; // Optional: styling

export default function EducationCard({ education }) {
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short'
  });

  return (
    <div className="education-card">
      <h3 className='institute'>{education.institution}</h3>
      <p> {education.degree}</p>
      <p>{education.marks}</p>
      <p>{formatDate(education.startDate)} - {formatDate(education.endDate)}</p>
      <p> {education.issueDate}</p>
 
      
    
    </div>
  );
}
