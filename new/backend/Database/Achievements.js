const mangoose = require('mongoose');
require('dotenv').config(); 
mangoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection achievements connected");
})
.catch((err) => {
    console.error(err);
});

const userschema = new mangoose.Schema({
    title: {
        type: String,
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    images: {
        type: String,
        required: true
    } 
});
const Achievements = mangoose.model('Achievements', userschema);
module.exports = Achievements;