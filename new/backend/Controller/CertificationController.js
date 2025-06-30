const certification = require('../Database/Certification');

const certificationData = async (req, res) => {
    try {
        const data = await certification.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}   

const addCertification = async (req, res) => {
    const { name, issuer, issueDate, credentialUrl } = req.body;

    try {
        await certification.create({ name, issuer, issueDate, credentialUrl });
        res.status(201).json("Successful");
    } catch (error) {
        console.error(error);
        res.status(400).json("Unsuccessful");
    }
}

const deleteCertification = async (req, res) => {
    const { name } = req.body;

    try {
        const deletedCertification = await certification.findOneAndDelete({ name });
        if (!deletedCertification) {
            return res.status(404).json({ message: "Certification not found" });
        }
        res.status(200).json({ message: "Certification deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { certificationData, addCertification, deleteCertification };  