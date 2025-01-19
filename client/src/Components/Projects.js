import './Projects.css'
import p1 from './Pictures/P1.jpeg'
import p2 from './Pictures/p2.png'
import p3 from './Pictures/P3.png'
import p4 from './Pictures/p4.jpg'
import p5 from './Pictures/p5.jpeg'
import p6 from './Pictures/p6.jpeg'
function Projects(){
    return(
        <>
        <div className="container-sm">

            <h1>
                Academic Projects 
            </h1>


            
            <a   className="pi" href="https://github.com/Alexoswin/AIML_Drug_rehab">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p5} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>Data Analysis and predection on Drug Addict patients </b> </h5>
                                <p className="card-text">Performed in-depth analysis of drug usage patterns and recovery timelines across various demographics. Explored key factors, including age, gender, and type of drug, to uncover trends and correlations. Leveraged data analytics tools such as Python (pandas, numpy) and visualization libraries (Matplotlib, seaborn) to present insights, aiding in understanding behavioral patterns and contributing to data-driven decision-making in public health and rehabilitation efforts.</p>
                               
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            <a  className="pi" href="https://github.com/Alexoswin/SIH-">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p2} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>Centralised Nasha mukti databsae</b> </h5>
                                <p className="card-text">Build a centralized system based on a role-based access control (RBAC) model using the MERN stack. Features include CRUD operations, a patient timeline, doctor appointment scheduling, a map feature displaying nearby centers, and secure password hashing.</p>
                            
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            <a  className="pi" href="https://github.com/Alexoswin/smart-blind-stick">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p1} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>IOT based Smart Blind Stick With live Tracking</b></h5>
                                <p className="card-text">Developed a MERN stack-based live tracking website using WebSocket protocol. Integrated NodeMCU with a GPS module for geolocation, ultrasonic sensors for obstacle detection, and an emergency button to send SMS alerts with location details.</p>
                               
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            <a  className="pi" href="https://github.com/Alexoswin/truck-rental-service">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p3} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>Truck logistics </b></h5>
                                <p className="card-text">Developed a comprehensive truck logistics platform using the MERN stack. The website allows users to book trucks tailored to their preferences and includes an interactive map powered by the Mapbox API to calculate distances and prices dynamically. This project highlights expertise in full-stack web development and API integration.</p>
                                
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            <a  className="pi" href="https://github.com/Alexoswin/email-spam-classifier">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p4} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>Email Spam classifier</b> </h5>
                                <p className="card-text">Developed an email spam classification system using machine learning techniques, leveraging Python libraries such as scikit-learn and pandas for data preprocessing, feature extraction, and model training. The project successfully identifies spam emails with high accuracy, showcasing skills in natural language processing and data analysis. </p>
                               
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            <a  className="pi" href="https://github.com/Alexoswin/MAD_Project">
            <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={p6} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title"><b>Mobile Application for Patients with Addiction </b></h5>
                                <p className="card-text">Designed and developed a mobile application using Flutter to assist addiction patients in their recovery journey. The app enables users to search for and book appointments at nearby rehabilitation centers while offering a personalized timeline to track recovery milestones and progress.</p>
                                
                            </div>
                        </div>
                    </div>
            </div>
            </a>
            
            
            


        </div>
        </>
    )
}
export default Projects;