const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection education connected");
})
.catch((err) => {
    console.error(err);
});

const userSchema = new mongoose.Schema({
    
    institution: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    marks: {
        type: String,
        required: true
    }
});

const Education = mongoose.model('Education', userSchema);
module.exports = Education;