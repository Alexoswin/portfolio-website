
const Skills = require('../Database/Skills');

const skilldata = async (req, res) => {

    try{
        const allSkill = await Skills.find({}).select('name image -_id');
        res.status(200).json(allSkill);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}


const AddSkill = async (req, res) => {
  const { name, image } = req.body;

  // Validate input
  if (!name || !image) {
    return res.status(400).json({ message: "Name and image are required." });
  }

  try {
    await Skills.create({ name, image }); // Use `create` instead of `insertMany` for single inserts
    res.status(201).json({ message: "Skill added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteSkill = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedSkill = await Skills.findOneAndDelete({ name });
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { skilldata, AddSkill, deleteSkill };