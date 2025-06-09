import './Skills.css';
import SkillCard from './SkillCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('http://localhost:8000/Skill');
                setSkills(res.data); // Set the received skill data
                console.log('Skills fetched successfully:', res.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div className="container-skills">
            <br />
            <h1 className="skills-title">Skills</h1>
            <br />
            <div className="skills-header">
                {skills.map((skill, index) => (
                    <SkillCard key={index} Name={skill.name} Image={skill.image} />
                ))}
            </div>
        </div>
    );
}
