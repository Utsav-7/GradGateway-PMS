require('dotenv').config();

const mongoose = require('mongoose');
var methodOverride = require('method-override')
const express = require('express');
const path = require('path');
const initData=require("./fackdata.js");
const nodemailer = require('nodemailer');
const collection=require("./models/User.js");
const bodyParser = require('body-parser');
const placement=require("./models/studentjobform.js");
const contact=require("./models/contact.js");
const app = express();
const port = process.env.PORT || 3000;
const Student = require('./models/Student.js'); // Adjust the path as needed


// ---------------------------middlewares -------------------
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const placedStudentRoutes = require('./routes/placedStudentRoutes'); // Adjust the path as necessary
const adminStudentRoutes = require('./routes/adminStudentRoutes'); // Adjust the path as necessary

app.use('/', placedStudentRoutes);
app.use('/', adminStudentRoutes);

// --------------------------- mongo db connection that not working correctly
// async function main() {
//   await mongoose.connect('mongodb+srv://utsav0712:utsav0712@cluster-1.lh3xn9t.mongodb.net/');
// }
// main().then(console.log("connection succefully")).catch(err => console.log(err));


// ---------------------- Mongo DB (Atlas) Connection -------------------------------------

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://utsav0712:utsav0712@cluster-1.lh3xn9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




const uri ="mongodb+srv://utsav0712:utsav0712@cluster-1.lh3xn9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";

if (!uri) {
  console.error('MongoDB URI is not defined. Please check your .env file.');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connection successful");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// --------------------------- Express Setup -------------------
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const { read } = require('fs');
const bcrypt = require('bcrypt');

// --------------------------- Default Routes -------------------
// Default routes
app.use(express.static('./public'));

// convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// app.listen
app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
});



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
// app.get('/testing',async(req,res)=>{
//     let test1=new contact({
//         fullName:"Jainam",
//         Lastname:"Jain",
//         enrollmentID:"21dce033",
//         email:"21dce033@charusat.edu.in",
//         message:"hello"
//     });

//     await test1.save();
//     res.send("saved in database");

// });




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




// // Route to fetch all placed students
// app.get('/students', async (req, res) => {
//     try {
//         const allStudents = await placement.find();
//         res.render('students', { alldata: allStudents });
//     } catch (err) {
//         console.error('Error fetching students:', err);
//         res.status(500).send('Server error');
//     }
// });



// app.get('/placedStudents', async (req, res) => {
//     const students = await Student.find({});
//     res.render('placedStudents', { students });
// });

// app.post('/update-status/:id', async (req, res) => {
//     const { status } = req.body;
//     await Student.findByIdAndUpdate(req.params.id, { status });
//     res.redirect('/placedStudents');
// });




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
            if(checkuser.enrollmentID == "TPOCHARUSAT01" || checkuser.enrollmentID == "TPOCHARUSAT02"){
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

// app.get('/send',async(req,res)=>{

// });

// ----------------------------- Email setup for Contact Us page

app.post('/send',async(req,res)=>{
    const fullName = req.body.fullName;
    const mobileNumber = req.body.mobileNumber;
    const email = req.body.email;
    const message = req.body.message;

    const contactdata={
        fullName,
        mobileNumber,
        email,
        message
    }
    try{
        const jobdata = await contact.insertMany(contactdata);
        
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'utsavkatharotiya0712@gmail.com',
                pass:'ohkl erbl gcuw lhgh'              
            }
        });
    
    
        const mailOptions = {
            from: '"GradGateway - PMS"<utsavkatharotiya0712@gmail.com>',
            to: email,
            subject: 'Thanks for contacting.',
            html: `
                <div style="text-align: center;">
                    <img src="cid:logo@kreata.ee" alt="Logo" style="width: 200px; height: auto; margin-bottom: 10px;"/>
                </div>
                <p>
                    We would like to acknowledge that we have received your application for your query. Our Helpdesk representative will review your query and send you a response shortly.
                </p>
                <div style="text-align: left;">
                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
                        <thead>
                            <tr style="background-color: #e6e6e6;">
                                <th colspan="2" style="text-align: center; font-size: 18px; padding: 10px;">Your Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: bold;">Full Name</td>
                                <td>${fullName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Email-ID</td>
                                <td>${email}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Mobile No.</td>
                                <td>${mobileNumber}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Message </td>
                                <td>${message}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                </div>
                <div style="text-align: center;">
                    <p>
                        Thank you for reaching out to us! We appreciate your interest in our services.
                    </p>
                
                    <p>
                        In the meantime, feel free to explore more about us on our website: <a href="https://www.charusat.ac.in/">Visit our website</a>
                    </p>
                    <div style="margin-top: 20px;">
                        <img src="cid:charusat@kreata.ee" alt="Charusat" style="width: 300px; height: auto;"/>
                    </div>
                </div>`,
            attachments: [
                {
                    filename: 'logo.png',
                    path: __dirname + '/public/images/mail-logo.png',
                    cid: 'logo@kreata.ee' // same cid value as in the HTML img src
                },
                {
                    filename: 'charusat.png',
                    path: __dirname + '/public/images/charusat.png',
                    cid: 'charusat@kreata.ee' // same cid value as in the HTML img src
                }
            ]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to send email.' });
            res.alert('Message not sent!');
            } else {
            console.log("Email sent: " + info.response);
            res.send('<script>window.location.href="/signinpage";window.location.href="/thanks.html";</script>');
            res.status(200).json({ success: true, message: 'Email sent successfully.' });
            }
        });
    } catch (error) {
      console.error('Failed to save contact data to MongoDB:', error);
      res.status(500).json({ success: false, message: 'Failed to save contact data to MongoDB.' });
    }
    
});