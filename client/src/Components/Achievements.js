import './Achievements.css';

import A2 from './Pictures/A2.jpeg';
import A3 from './Pictures/A3.jpeg';
import A4 from './Pictures/A4.jpeg';

function Achievements() {
    return (
        <>
            <div className="container-sm">
                <h1><img id="SIH" src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1" />Smart India Hackathon 2023 Winner </h1>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                       
                        <div className="carousel-item active">
                            <img  src={A4} className="d-block w-100" alt="Achievement 2" />
                        </div>
                        <div className="carousel-item">
                            <img src={A3} className="d-block w-100" alt="Achievement 3" />
                        </div>
                        <div className="carousel-item">
                            <img src={A2} className="d-block w-100" alt="Achievement 4" />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div>
                    <p id="t"> <b>
                        Problem Statement : Centralised Nasha Mukti
                        Database
                        </b>
                      
                    </p>
                    <p id="t">
                        Solution: Build a centralized system based on a role-based access control (RBAC) model using the MERN stack. Features include CRUD operations, a patient timeline, doctor appointment scheduling, a map feature displaying nearby centers, and secure password hashing.

                    </p>
                      
                </div>
                 <button type="button" class="btn btn-success"><a  id="link" href="https://github.com/Alexoswin/SIH-.git">View Solution </a></button>
            </div>
        </>
    )
}

export default Achievements;
