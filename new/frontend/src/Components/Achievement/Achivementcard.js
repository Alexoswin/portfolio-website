
import './Achievementcard.css';

export default function Achievementcard(props) {
    return (
        <div className='AchievementCardContainer'>
            <div className='AchievementCard'> 
                <div className='img'>
                    <img className='img' src={props.image} alt={props.name} />            
                </div>
                <h5><b>{props.name}</b></h5>
                <p>{props.Description}</p>
            </div>
        </div>
    );
}
