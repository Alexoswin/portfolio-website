// EducationCard.js
import React from 'react';
import './EducationCard.css'; // Optional: styling

export default function EducationCard({ education }) {
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short'
  });

  return (
    <div className="education-card">
      <h3>{education.institution}</h3>
      <p><strong>Degree:</strong> {education.degree}</p>
      <p><strong>Marks:</strong> {education.marks}</p>
      <p><strong>Duration:</strong> {formatDate(education.startDate)} - {formatDate(education.endDate)}</p>
    </div>
  );
}
