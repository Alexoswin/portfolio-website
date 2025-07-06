const Login = require('../Database/Login.js');
const bcrypt = require("bcrypt"); 

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Login.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await user.generateAuthToken();

        res.status(200).json({
            message: "Login successful",
            token: token,
            userId: user._id.toString(),
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginController };
