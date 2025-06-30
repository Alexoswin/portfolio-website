const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection certifications connected");
}
)
.catch((err) => {
    console.error(err);
});

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    issuer:{
        type: String,
        required: true
    },
    issueDate:{
        type: Date,
        required: true
    },
    credentialUrl:{
        type: String,
        required: true
    }
});

const certification = mongoose.model('certification', userschema);
module.exports = certification;