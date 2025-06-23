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

module.exports = { educationData, addEducation };