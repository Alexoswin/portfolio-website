import './Achievement.css';
import Achievementcard from './Achivementcard';

export default function Achievement() {
    const achievements = [
        {
            name: "Smart India Hackathon",
            Description: "Champions of Innovation! 🏆 Proud winners of the Smart India Hackathon 2023...Some other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement description",
            image: "https://media.licdn.com/dms/image/v2/D4D22AQFz8CYHyIXMPw/feedshare-shrink_800/feedshare-shrink_800/0/1705868289281?e=1755129600&v=beta&t=-c1whPMGafdtSusL5zrtE8GJeJpwsG2c6uR6V9GFgA0 "
        },
        {
            name: "Second Achievement",
            Description: " Some other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement descriptionSome other awesome achievement description...",
            image: "https://media.licdn.com/dms/image/v2/D4D22AQFz8CYHyIXMPw/feedshare-shrink_800/feedshare-shrink_800/0/1705868289281?e=1755129600&v=beta&t=-c1whPMGafdtSusL5zrtE8GJeJpwsG2c6uR6V9GFgA0"
        }
    ];

    return (
        <div className='AchievementComponent'>
            <hr />
            <div className='title'>
              
            </div>

            {achievements.map((achievement, index) => (
                <Achievementcard
                    key={index}
                    index={index}
                    name={achievement.name}
                    Description={achievement.Description}
                    image={achievement.image}
                    Date="17-05-2003"
                />
            ))}
        </div>
    );
}
