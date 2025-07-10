const Project = require('../Database/Project')

const projectData = async (req, res) =>{

    try{

        const data = await Project.find({});
        res.status(200).json(data);
    }
    catch(error){
      console.error(error);
      res.status(500).json("Server error");
    }  
}


const addProjects = async(req, res)=>{
    const {title , description, image, githubLink, techStack} = req.body
 const techStackArray = techStack.split(',').map(item => item.trim());

    try{
        await Project.create({title , description, image, githubLink,  techStack: techStackArray,});
        res.status(200).json("Sucessfull");
    }
    catch(error){
        console.error(error);
        res.status(400).json("Unsucessfull");
    }
}
const deleteProject = async (req, res) => {
    const { title } = req.body; 

    try {
        const deletedProject = await Project.findOneAndDelete({ title });
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { projectData, addProjects, deleteProject };