
const Skills = require('../Database/Skills');

const skilldata = async (req, res) => {

    try{
        const Skill = await   Skills.find({});
        res.status(200).json({Skills: Skill});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}


const AddSkill = async (req, res) => {
    const { Skill, Image } = req.body;
      const data =({
            Skill: Skill,
            Image: Image });
    try {
        await Skills.insertMany(data);
        res.status(201).json({ message: "Skill added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = { skilldata, AddSkill };