const Education = require('../Database/Education');

const educationData = async (req, res) => {
    try {
        const data = await Education.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}

const addEducation = async (req, res) => {
    const { institution, degree, startDate, endDate, marks } = req.body;

    try {
        await Education.create({ institution, degree, startDate, endDate, marks });
        res.status(201).json("Successful");
    } catch (error) {
        console.error(error);
        res.status(400).json("Unsuccessful");
    }
}

const deleteEducation = async (req, res) => {
    const { degree } = req.body;

    try {
        const deletedEducation = await Education.findOneAndDelete({ degree });
        if (!deletedEducation) {
            return res.status(404).json({ message: "Education not found" });
        }
        res.status(200).json({ message: "Education deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { educationData, addEducation, deleteEducation };