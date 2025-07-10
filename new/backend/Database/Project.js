const monngoose = require('mongoose');
require('dotenv').config();
monngoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection project connected");
})  
.catch(() => {
    console.log('failed to connect to project collection');
});

const userSchema = new monngoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
});

const Project = monngoose.model('Project', userSchema);
module.exports = Project;