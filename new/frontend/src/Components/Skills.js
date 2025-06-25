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
                setSkills(res.data);
                console.log('Skills fetched successfully:', res.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <>
        <div className="container-skills">
            <br /><br />
            <h1><b className="skills-title">SKILLS</b></h1>
            <br /><br /><br />
            <div className="skills-header">
                {skills.map((skill, index) => (
                    <SkillCard key={index} Name={skill.name} Image={skill.image} />
                ))}
            </div>

           
        </div>
             
      
        </>
    );
}
