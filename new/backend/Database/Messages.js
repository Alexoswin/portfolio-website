const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongodb collection project connected");
})  
.catch(() => {
    console.log('failed to connect to project collection');
});
const userSchema = new mongoose.Schema({

    name:{
        type: String, 
        required: true       
    },
    email:{
        type: String,
        required: true
    },
    Subject:{
        type: String,
        required: true

    },
    Message:{
        type: String,
        required: true
    }

});

const Messages = mongoose.model('Messages',userSchema);
module.exports = Messages