import './Achievement.css'
import Achievementcard from './Achivementcard';

export default function Achievement(){

    return(

        <div className='AchievementComponent'>
            <hr/>
           <div className='title'>  <h2> Achievement</h2></div>

               <Achievementcard 
               name="Smart India Hackthon"   
               Description="Champions of Innovation! 🏆 Proud winners of the Smart India Hackathon 2023, our team's revolutionary Centralised Nasha Mukti Database solution marks a pivotal step towards a substance-free society. Immense gratitude to the brilliance of Aditya Kareer, Sumit Sawant, Aryaan Sawant, Shazmeen Shaikh, Pradnya Ingulkar and the unwavering guidance from Mentor Tayyabali Sayyad."
               image="https://media.licdn.com/dms/image/v2/D4D22AQFz8CYHyIXMPw/feedshare-shrink_800/feedshare-shrink_800/0/1705868289281?e=1755129600&v=beta&t=-c1whPMGafdtSusL5zrtE8GJeJpwsG2c6uR6V9GFgA0"
        
               />

        </div>
    );
}  