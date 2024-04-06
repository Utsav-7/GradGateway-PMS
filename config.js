const user=require('./models/model'); 
const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb+srv://utsav0712:utsav0712@cluster-1.lh3xn9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1');


connect.then(() => {
    console.log("Database connected Successfully..");
})
.catch(() => {
    console.log("Database cannot be connected");
});
