import "./Projects.css";

export default function Projects(image, title ,description , githubLink, techStack) {
    return (
                <>
                <div id="forc">
                <div className="card mb-3"  >

                        
                        <div className="row g-0 ">
                        <div  id="cardimage1" style={{ backgroundImage: `url(${image})` }}>
                        
                        </div><br/>
                        <div className="col-md-8">
                            <div className="card-body">
                            <div id="cardtext"> {title} </div>
                            <p className="card-text"> 
                                {description}
                            </p>
                            <p>
                                techStack: {techStack}
                            </p>
                            <p>
                                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                          
                                </a>
                            </p>
                            </div>
                            </div>
                        </div>
                        </div>
                <div/> 
                </div>
                </>
  )
}