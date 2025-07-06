const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb collection login connected")

})
.catch(()=>{
    console.log('failed')
})

const userSchema = new mongoose.Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    try{
        return jwt.sign({ _id: this._id.toString(), email : this.email, }, process.env.JWT_SECRET_KEY, { expiresIn: '20minutes' });
    }
    catch (error) {
        console.error(error);
    };
}

const Login = mongoose.model('Login', userSchema);
module.exports = Login;