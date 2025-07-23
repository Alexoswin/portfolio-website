import './Delete.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Achievementcard from '../../Achievement/Achivementcard';


export default function DeleteAchievement() {  
const [selectedAchievement, setSelectedAchievement] = useState(null); // track achievement to delete
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

    const handleDelete = async () => {
        if (!selectedAchievement) return;   

        try {
            await axios.delete(`http://localhost:8000/deleteachievement/${selectedAchievement.title}`);
            setAchievements(achievements.filter(achievement => achievement.title !== selectedAchievement.title));
            console.log('Achievement deleted successfully:', selectedAchievement.title);
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }

        setSelectedAchievement(null);
    }

    const confirmDelete = (achievement) => {
        setSelectedAchievement(achievement); // show confirmation box
    }

    return (
  <div className='page'> 
          <div className='AchievementComponent'>
            <br /><br /><br />
            <div className='title'>
              <h2> Achievements</h2>
            </div>

            {achievements.map((achievement, index) => (
                <div key={achievement._id} onClick={() => confirmDelete(achievement)} style={{ cursor: 'pointer' ,width: '100%'}}>
                    <Achievementcard
                        key={index}
                        index={index}
                        name={achievement.title}
                        Description={achievement.description}
                        image={achievement.image}
                    Date={achievement.date}
                />
       
                </div>
            ))}
            
        </div>

        {selectedAchievement && (
          <div className='deleteitem'>
           <h3>Are you sure you want to delete <b>{selectedAchievement.title}</b>?</h3>
            <button  className="btns" onClick={handleDelete}>Delete</button>
            <button className="btns" onClick={() => setSelectedAchievement(null)}>Cancel</button>
          </div>
        )}

  </div>

    );
}