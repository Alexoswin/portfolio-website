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

    try{
        await Project.create({title , description, image, githubLink, techStack});
        res.status(201).json("Sucessfull");
    }
    catch(error){
        console.error(error);
        res.status(400).json("Unsucessfull");
    }
}

module.exports = {projectData , addProjects};