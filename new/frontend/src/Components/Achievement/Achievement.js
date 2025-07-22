import './Achievement.css';
import Achievementcard from './Achivementcard';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Achievement() {
    
    const [achievements, setAchievements] = useState([]);
    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await axios.get('http://localhost:8000/achievementdata');
                setAchievements(response.data);
                console.log('Achievements fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchAchievements();
    }, []);
    return (
        <div className='AchievementComponent'>
            
            <div className='title'>
              
            </div>

            {achievements.map((achievement, index) => (
                <Achievementcard
                    key={index}
                    index={index}
                    name={achievement.title}
                    Description={achievement.description}
                    image={achievement.image}
                    Date={achievement.date}
                />
            ))}
            
        </div>
    );
}
    