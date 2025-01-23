import './Skill.css';
import Box from './Box.js';
import ImageBox from './ImageBox.js';
import A from './Pictures/Skill1.png'
import B from './Pictures/Skill2.png'
import C from './Pictures/Skill4.png'
import F from './Pictures/Skill5.png'
function Skills() {
    return (
        <>
        <div className="container-sm">
            <h1>Skills and tools</h1>
            <br/>
            <br/>
            <div>
                
                <div id ="boxofimages">
                
                <ImageBox Image={A} />
                <ImageBox Image={B} />
                <ImageBox Image={C} />
                <ImageBox Image={F} />
                </div>
                

                <div id="boxofskills">
                <Box Name="Java"/>
                <Box Name="Python"/>
                <Box Name="JavaScript"/>
                <Box Name="React"/>
                <Box Name="Node.js"/>
                <Box Name="Express.js"/>
                <Box Name="MongoDB"/>
                <Box Name="SQL"/>
                <Box Name="Flutter"/>
                <Box Name="Git"/>
            
         
                <Box Name="Docker"/>
                <Box Name="jenkins"/>
                <Box Name="AWS"/>
             
                <Box Name ="IOT"/>
                <Box Name ="Wireshark"/>
                <Box Name ="REST API"/>
                <Box Name="Machine Learning"/>
               
               
                <Box Name="Data Analysis" />
                <Box Name="Postman" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Skills;
