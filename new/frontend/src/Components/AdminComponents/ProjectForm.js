import { useState } from "react";
import "./Form.css"; // Link your CSS file
import Cookies from "js-cookie"
import { fileToBase64 } from "../fileToBase64";
import axios from "axios";

export default function ProjectForm() {

   const token = Cookies.get('token');
const[title, setTitle] = useState("");
const[description , setDescription] = useState("");
const[techStack , setTechStack]= useState("");
const[githubLink, setGithubUrl] = useState("");
const[image , setImage] = useState(null);
const[message, setMessage]= useState(""); 

const handleSubmit = async(e)=>{
  e.preventDefault();

  
    if (!image) {
      setMessage("❌ Please upload an image.");
      return;
    }

    try{
       const base64Image = await fileToBase64(image);

      const response = await axios.post("http://localhost:8000/addproject",
        {
          title, description , techStack, githubLink, image:[base64Image]
        },
        {
        
            headers: {
              Authorization: token,}
        }
      )

      if(response.status === 200){
        setMessage("✅ Project added")
      }
      else{
        setMessage("❌ Server error please try again later")
      }
    

    }
    catch{
        setMessage("❌ Server error please try again later")
      }
    
    setTitle("");
    setDescription("")
    setGithubUrl("");
    setImage(null)
    setTechStack("")


}

  return (
    <div className="form-container">
      <form className="form-card">
        <h3>Add Project</h3>
       <h5> {message}</h5>
        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            className="bi bi-tag" viewBox="0 0 16 16">
            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
            <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
          </svg> <input type="text" value={title} placeholder="Project Title" required  onChange={(e)=> setTitle(e.target.value)}/>
        </div>

        <div className="input-group">
       <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            className="bi bi-card-text" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
          </svg> Description</p><textarea type="text" rows="4" value={description} placeholder="Project Description" required onChange={(e)=> setDescription(e.target.value)} />
        </div>

        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            className="bi bi-code-slash" viewBox="0 0 16 16">
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294z" />
            <path d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
          </svg> <input type="text" value={techStack} placeholder="Tech Stack" required  onChange={(e)=> setTechStack(e.target.value)}/>
        </div>

        <div className="input-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            className="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg> <input type="text" value={githubLink} placeholder="GitHub URL" required onChange={(e)=> setGithubUrl(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="file-upload" className="custom-file-upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
            </svg>
            {image ? image.name : 'Choose image'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
