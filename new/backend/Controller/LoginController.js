const Login = require('../Database/Login.js')

const loginController = async(req, res) => {
    const { email, password } = req.body;
    const check = await Login.findOne({ email, password });

    try{
        if(check){
            res.status(200).json({message: "Login successful",token : await check.generateAuthToken(), userId : check._id.toString() });
        } 
        else{
            res.status(400).json({message: "Invalid credentials"});
        }  
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { loginController };