const mongoose = require('mongoose');
const schema=mongoose.Schema;

const contactschema= new schema(
    {
        fullName:String,
        Lastname:String,
        enrollmentID:String,
        email:String,
        message:String
           
    }
);
const contact= new mongoose.model( "contact",contactschema);
module.exports=contact;

