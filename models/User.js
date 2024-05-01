const mongoose = require('mongoose');



// create schemas
const user = new mongoose.Schema({
    
    enrollmentID:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
});
const collection = new mongoose.model('users',user);

module.exports = collection;