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

    name:{
        type: String, 
        require: true       
    },
    email:{
        type: String,
        require: true
    },
    Subject:{
        type: String,
        require: true

    },
    Message:{
        type: String,
        require: true
    }

});

const Messages = monngoose.model('Messages',userSchema);
module.exports = Messages