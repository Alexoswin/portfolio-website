import "./Projects.css";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8000/projectData");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return(
        
            <div className="projects">
         <br/><br /><br />

              

                <h2><b>Projects</b></h2>
                
          
                <div className="project-cards">
                    <div className="project-cards">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} title={project.title} description={project.description} image={project.image} githubUrl={project.githubLink} techStack={project.techStack} />
                    ))}
                </div>
                
            </div>
        </div>
    );

}