import './Skill.css';
import Box from './Box.js';
import ImageBox from '../ImageBox.js';
import Skill1 from './pictures/Skill1.png';

function Skills() {
    return (
        <>
        <div className="container-sm">
            <h1>Skills and tools</h1>
            <div>
                
                <div id ="boxofimages">
              
                
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
                <Box Name="TypeScript"/>
                <Box Name ="IOT"/>
                <Box Name ="Wireshark"/>
                <Box Name ="REST API"/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Skills;
