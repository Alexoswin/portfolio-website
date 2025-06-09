const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection skills connected");
})  
.catch(() => {
    console.log('failed to connect to skills collection');
});

const userSchema = new mongoose.Schema({
    Skill: {
        type: String,
        required: true,
        unique: true
    },
    Image: {
        type: String,  
        required: true,
        unique: true
    },
}); 
const Skills = mongoose.model('Skills', userSchema);
module.exports = Skills; 