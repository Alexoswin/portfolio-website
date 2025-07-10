import { useState } from "react";
import "./Form.css"; // Reuse your existing CSS
import axios from "axios";
import Cookies from 'js-cookie';

export default function EducationForm() {
 
  const token = Cookies.get('token');
 const[institution , setInstitution ] = useState("");
 const[degree , setDegree] = useState("");
 const[startDate, setStartDate]= useState("");
 const[endDate, setEndDate]= useState("");
 const[marks, setMarks] = useState("");
const[message, setMessage] = useState("")
   const handleSubmit = async (e) => {
    e.preventDefault();
    

    try{
      const response = await axios.post("http://localhost:8000/addeducation", 
        {
          institution,
          degree,
          startDate,
          endDate,
          marks
        }
      )

      if(response.status === 200){
          setMessage("✅ Added Sucessfully")
      }
      else{
        setMessage("❌ Failed to add Server error")
      }
    }
    catch(err){
      console.log(err)
      setMessage("❌ Failed to add Server error")
    }
    setDegree("");
    setInstitution("");
    setMarks("");
    setEndDate("");
    setStartDate("")

   }
  return (
    <div className="form-container">
      <form className="form-card"  onSubmit={handleSubmit} >
        <h3>Add Education</h3>
        {message}
        <div className="input-group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-buildings-fill" viewBox="0 0 16 16">
                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
            </svg>
          <input type="text" name="institution" placeholder="Institution" value={institution} required  onChange={(e) => setInstitution(e.target.value)} />
        </div>

        <div className="input-group">
            
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
        </svg>
          <input type="text" name="degree" placeholder="Degree" required value={degree}  onChange={(e)=> setDegree(e.target.value)}
 />
        </div>

        <div className="input-group">
          <label>Start Date</label>
          <input type="date" name="startDate" required  value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
        </div>                                                              

        <div className="input-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={endDate} onChange={(e)=> setEndDate(e.target.value)} />
        </div>

        <div className="input-group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <input type="text" name="marks"  value={marks} placeholder="Marks / GPA"  onChange={(e)=> setMarks(e.target.value)} />
        </div>

        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
  );
}
