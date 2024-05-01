const mongoose = require('mongoose');
const schema=mongoose.Schema;

const placeschema= new schema(
    {
        Name:String,
        Lastname:String,
        enrollmentID:String,
        collegename:String,
        comapanyname:String,
           
    }
);
const placement= new mongoose.model( "placement",placeschema);
module.exports=placement;

