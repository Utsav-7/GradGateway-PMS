const mongoose = require('mongoose');
var methodOverride = require('method-override')
const express = require('express');
const path = require('path');
const initData=require("./fackdata.js");
const nodemailer = require('nodemailer');
const collection=require("./models/User.js");
const bodyparser = require('body-parser');
const placement=require("./models/studentjobform.js");
const contact=require("./models/contact.js");
const app = express();
const port = process.env.PORT || 3000;

main().then(console.log("connection succefully")).catch(err => console.log(err));
app.use(methodOverride('_method'));
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
app.delete('/delete/:id',async(req,res)=>{
    let {id}=req.params;
  console.log(id);
    
  let del=await placement.deleteOne({enrollmentID:id});
  console.log(del);
  let alldata = await placement.find();

     res.render("admin.ejs",{alldata});

})
app.post('/signin/submit-job', async (req, res) =>{

    const data = {
        Name:req.body.name,
        Lastname:req.body.lastname,
        enrollmentID:req.body.enrollmentID,
        collegename:req.body.collegename,
        comapanyname:req.body.comapanyname
    }
    console.log(data);

    
    const jobdata = await placement.insertMany(data);
    const checkuser = await collection.findOne({enrollmentID: req.body.enrollmentID});
    
    res.render("student.ejs",{checkuser});
   
});

app.get('/profile/:id',async(req,res)=>{
    let {id}=req.params;
    const userprofile = await collection.findOne({enrollmentID:id});
    res.render('profile.ejs',{userprofile});

});
app.get('/testing',async(req,res)=>{
    let test1=new contact({
        fullName:"Jainam",
        Lastname:"Jain",
        enrollmentID:"21dce033",
        email:"21dce033@charusat.edu.in",
        message:"hello"
    });

    await test1.save();
    res.send("saved in database");

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
        enrollmentID: req.body.enrollmentID,
        email: req.body.email,
        password: req.body.password
    }
     const existinguser = await collection.findOne({enrollmentID:data.enrollmentID});
    // check if the user already exist in the database

    
    
  
    if(existinguser){
        res.send('<script>alert("User already exist. Please choose a different enrollment ID.");window.location.href="/signinpage";</script>'
        
    );
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
            res.sendFile(path.resolve(__dirname,'./public/invalid.html'));       
         }

        const isPassword = await bcrypt.compare(req.body.password, checkuser.password);
        if(isPassword){
            if(checkuser.enrollmentID == "TPOCHARUSAT"){
                let alldata = await placement.find();

                res.render("admin.ejs",{alldata});
            }
            else{
                res.render("student.ejs",{checkuser});
            }
        }else{
            res.render("wrong.ejs",{checkuser});
        }
    }catch{
        res.sendFile(path.resolve(__dirname,'./public/invalid.html'));
    }
   
    
});


// Email setup for Contact Us page
app.post('/send',async(req,res)=>{
    const contactdata={
        fullName:req.body.fullName,
         Lastname:req.body.mobile,
         enrollmentID:req.body.enrollmentID,
         email:req.body.email,
         message:req.body.message
    }
    const jobdata = await contact.insertMany(contactdata);
    
    const fullName = req.body.fullName;
    const mobile = req.body.mobileNumeber;
    const email = req.body.email;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'utsavkatharotiya0712@gmail.com',
            pass:'ohkl erbl gcuw lhgh'              
        }
    })

    const mailOptions={
        from: 'utsavkatharotiya0712@gmail.com',
        to: email,
        cc:'',
        subject:'Thanks for contacting.',
        html: `
        <div style="text-align: center;">
            <img src="cid:logo@kreata.ee" alt="Logo" style="width: 200px; height: auto; margin-bottom: 10px;"/>
        </div>
        <div style="text-align: left;">
            <p style="text-align:left!important">
                <h2>Your Request.</h2>
                Full Name : ${fullName} <br>
                Email-ID : ${email} <br>
                Your Mobile Number: ${mobile} <br>
                Your Message:  ${message}
            </p><hr>
        </div>
        <div style="text-align: center;">
            <p>
                Thank you for reaching out to us! We appreciate your interest in our services.
            </p>
            <p>
            We would like to acknowledge that we have received your application for your query. Our Helpdesk representative will review your query and send you a response shortly.
            </p>
            <p>
            In the meantime, feel free to explore more about us on our website: <a href="https://www.charusat.ac.in/">Visit our website</a>
            </p>
            <div style="margin-top: 20px;">
            <img src="cid:charusat@kreata.ee" alt="Charusat" style="width: 300px; height: auto;"/>
            </div>
        </div>`,
        attachments: [{
            filename: 'logo.png',
            path: __dirname + '/public/images/mail-logo.png',
            cid: 'logo@kreata.ee' //same cid value as in the html img src
        },
        {
            filename: 'charusat.png',
            path: __dirname + '/public/images/charusat.png',
            cid: 'charusat@kreata.ee' //same cid value as in the html img src
        }]
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to send email.' });
        } else {
            res.send('<script>window.location.href="/signinpage";window.location.href="/thanks.html";</script>');
            console.log("Email sent: " + info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully.' });
        }
    });
    
});