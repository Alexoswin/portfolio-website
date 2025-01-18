import './Container.css';
import profile from './Pictures/Profile.jpg';
import resume from './Pictures/Resume.pdf'

function Container (){

    return(
        <>
        <div class="container-sm">
              <div className="imageBox">
              <img  id="profile" src={profile} alt="Profile" />


              </div>
              <div className= "content">
              <h1>
                   Hi I am Oswin Alex

              </h1>
              <p>
              A passionate and skilled software developer with a strong foundation in web and mobile development, data analytics, and IoT systems. I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) for full-stack web applications, Flutter for mobile development, and have experience in DevOps tools like AWS and Docker. With a keen interest in analyzing data patterns, I have successfully worked on projects ranging from addiction rehabilitation systems to IoT-based solutions like a Smart Blind Stick. I aim to create impactful and innovative solutions to real-world problems.

              </p>
              </div>  
              <div>
              <button type="button" class="btn btn-success"><a  id="link" href={resume}>View Resume </a></button>
              </div> 
            
                      
        </div>
        </>
    )
}

export default Container;