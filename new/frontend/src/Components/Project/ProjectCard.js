import "./ProjectCard.css";

export default function ProjectCard({ image, title, description, githubUrl, techStack }) {
    return (
  
         <div className="project-card">
            <div className="project-image">
                <img src={image} alt={title} />
            </div> 

            <div className="project-details">
                <h2><b>{title}</b></h2>
                <p>{description}</p>
                <p><strong>Tech Stack:</strong> {techStack} </p>
                <a className="atag" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </div>
 
    );
}
