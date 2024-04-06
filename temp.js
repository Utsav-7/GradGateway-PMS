// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://utsav0712:utsav0712@cluster-1.lh3xn9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.post('/signup', async (req,res) => {
    const data = {
        userType: req.body.userType,
        enrollmentID: req.body.enrollmentID,
        email: req.body.email,
        password: req.body.password
    }

    // check if the user already exist in the database
    const existingUser = await collection.findOne({ enrollmentID: data.enrollmentID });
    if(existinguser){
        res.send('<script>alert("User already exist. Please choose a different enrollment ID.");window.location.href="/signinpage";</script>');
    }else{
        // hash the password using bcrypt 
        const saltRounds = 10;
        const hashPasswords = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPasswords; // replace the hash password with origional password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.get('/temp', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/temp.html'));
});
app.get('/temp', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/temp.html'));
})

app.post('/tempup', async (req,res) => {
    const data = {
        userType: req.body.userType,
        enrollmentID: req.body.enrollmentID,
        email: req.body.email,
        password: req.body.password
    }

    // check if the user already exist in the database
    const existinguser = await collection.findOne({enrollmentID:data.enrollmentID});
    if(existinguser){
        res.send('<script>alert("User already exist. Please choose a different enrollment ID.");window.location.href="/signinpage";</script>');
    }else{
        // hash the password using bcrypt 
        const saltRounds = 10;
        const hashPasswords = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPasswords; // replace the hash password with origional password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.post('/tempin', async (req,res) =>{
    try{
        const checkuser = await collection.findOne({enrollmentID: req.body.enrollmentID});
        if(!checkuser){
            res.send('<script>alert("User not found!");window.location.href="/signinpage";</script>');
        }

        const isPassword = await bcrypt.compare(req.body.password, checkuser.password);
        if(isPassword){
            if(req.body.userType == "Administrator"){
                res.sendFile(path.resolve(__dirname,'./public/dashboards/admin.html'));
            }else if(req.body.userType == "Company"){
                res.sendFile(path.resolve(__dirname,'./public/dashboards/company.html'));
            }else{
                res.sendFile(path.resolve(__dirname,'./public/dashboards/student.html'));
            }
        }else{
            res.send('<script>alert("Wrong Password!");window.location.href="/signinpage";</script>');
        }
    }catch{
        res.send('<script>alert("Invalid Credentials...");window.location.href="/signinpage";</script>');
    }
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
