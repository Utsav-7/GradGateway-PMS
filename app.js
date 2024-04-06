const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const collection=require("./models/User.js");
const app = express();
const port = process.env.PORT || 5000;

main().then(console.log("connection succefully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Student');
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const { read } = require('fs');
const bcrypt = require('bcrypt');

// Default routes
app.use(express.static('./public'));

// convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// app.listen
app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/error404.html'));
});

app.get('/signuppage', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/SignUpIn.html'));
});
app.get('/signinpage', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/SignUpIn.html'));
})
app.get('/blog', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/blog.html'));
});


app.post('/signup', async (req,res) => {
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

        res.render("signup.ejs",{data});
        }
});

app.post('/signin', async (req,res) =>{
    try{
        const checkuser = await collection.findOne({enrollmentID: req.body.enrollmentID});
        if(!checkuser){
            res.send('<script>alert("User not found!");window.location.href="/signinpage";</script>');
        }

        const isPassword = await bcrypt.compare(req.body.password, checkuser.password);
        if(isPassword){
            if(req.body.userType == "Administrator"){
                res.sendFile(path.resolve(__dirname,'./public/dashboards/admin.html'));
            }
            else{
                res.render("student.ejs",{checkuser});
            }
        }else{
            res.render("wrong.ejs",{checkuser});
        }
    }catch{
        res.send('<script>User does not exits</script>');
    }
   
    
});