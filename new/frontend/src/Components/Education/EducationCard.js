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
      <p> <svg className="date-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
            </svg> {formatDate(education.startDate)} - {formatDate(education.endDate)}</p>
      <p> {education.issueDate}</p>
 
      
    
    </div>
  );
}
