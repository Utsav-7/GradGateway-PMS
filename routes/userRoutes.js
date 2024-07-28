// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is defined

// Route to get user by enrollmentID
router.get('/:enrollmentID', async (req, res) => {
    try {
        const user = await User.findOne({ enrollmentID: req.params.enrollmentID });
        res.redirect("index.html");
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// routes/updateStatus.js
const express = require('express');
const Student = require('../models/student');

// Route to update student status
router.post('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await Student.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/placed-students'); // Redirect back to the placed students page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
