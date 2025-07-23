import { useEffect, useState } from 'react';
import axios from 'axios';
import './Delete.css';
import SkillCard from '../../Skill/SkillCard';

export default function DeleteSkills() {
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null); // track skill to delete

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

    const confirmDelete = (skill) => {
        setSelectedSkill(skill); // show confirmation box
    };

    const handleDelete = async () => {
        if (!selectedSkill) return;
        try {
            await axios.delete(`http://localhost:8000/deleteskill/${selectedSkill.name}`);
            setSkills(skills.filter(skill => skill.name !== selectedSkill.name));
            setSelectedSkill(null);
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    return (
        <div className='page'>
            <div className="container-skills">
                <br /><br /><br />
                <h2><b className="skills-title">Skills</b></h2>
                <br /><br /><br />
                <div className="skills-header">
                    {skills.map((skill) => (
                        <div key={skill._id} onClick={() => confirmDelete(skill)} style={{ cursor: 'pointer' }}>
                            <SkillCard Name={skill.name} Image={skill.image} />
                        </div>
                    ))}
                </div>
            </div>
            {selectedSkill && (
                <div className="deleteitem">
                    <h3>Are you sure you want to delete <b>{selectedSkill.name}</b>?</h3>
                    <button className="btns" onClick={handleDelete}>Confirm Delete</button>
                    <button className="btns" onClick={() => setSelectedSkill(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}