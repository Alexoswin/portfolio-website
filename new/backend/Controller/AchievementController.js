const Achievements = require('../Database/Achievements');

const achievementData = async (req, res) => {
    try {
        const data = await Achievements.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json("Server error");
    }
}   
const addAchievement = async (req, res) => {
    const { title, description, date , image} = req.body;

    try {
        await Achievements.create({ title, description, date, image });
        res.status(200).json("Successful");
    } catch (error) {
        console.error(error);
        res.status(400).json("Unsuccessful");
    }
}    

const deleteAchievement = async (req, res) => {
    const { title } = req.body;

    try {
        const deletedAchievement = await Achievements.findOneAndDelete({ title });
        if (!deletedAchievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }
        res.status(200).json({ message: "Achievement deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { achievementData, addAchievement, deleteAchievement    };
