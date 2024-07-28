const user=require('./models/model'); 
const mongoose = require('mongoose');
const connect = mongoose.connect('your_mongo-db_url');


connect.then(() => {
    console.log("Database connected Successfully..");
})
.catch(() => {
    console.log("Database cannot be connected");
});
