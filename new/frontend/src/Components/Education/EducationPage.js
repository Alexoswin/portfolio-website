// EducationPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EducationCard from './EducationCard';
import './EducationPage.css'; // Optional: styling

export default function EducationPage() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationAndCertifications = async () => {
      try {
        const [eduRes, certRes] = await Promise.all([
          axios.get('http://localhost:8000/educationdata'),
          axios.get('http://localhost:8000/certificationdata'),
        ]);

        const formattedCertifications = certRes.data.map(cert => ({
          institution: cert.issuer,
          degree: cert.name,
          startDate: cert.issueDate,
          marks: cert.credentialUrl,
          _id: cert._id,
          isCertification: true,
        }));

        const formattedEducation = eduRes.data.map(edu => ({
          ...edu,
          isCertification: false,
        }));

        const mergedData = [...formattedEducation, ...formattedCertifications];
        setEducationList(mergedData);
      } catch (err) {
        console.error('Error fetching education or certification data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationAndCertifications();
  }, []);

  return (
    <>
     
      <div className="education-page">
       <br/>
       
        <h2>Education and Certification</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          educationList.map((edu) => (
            <EducationCard key={edu._id} education={edu} />
          ))
        )}
      </div>
    </>
  );
}
