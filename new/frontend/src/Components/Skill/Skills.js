import './Skills.css';
import SkillCard from './SkillCard';
import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get(`/Skill`);
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
                <br /><br /><br />


                <h2><b className="skills-title">Skills</b></h2>
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
