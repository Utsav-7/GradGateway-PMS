const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.render('placedStudents', { students });
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Server Error');
    }
});

router.get('/students/add', (req, res) => {
    res.render('addStudent'); // Render the EJS form for adding a new student
});

// Route to handle add student form submission
router.post('/students/add', async (req, res) => {
    const { firstName, lastName, enrollmentID, collegeName, companyName, placed } = req.body;
    try {
        const newStudent = new Student({
            firstName,
            lastName,
            enrollmentID,
            collegeName,
            companyName,
            placed: placed === 'true'  // Convert 'true'/'false' to boolean
        });
        await newStudent.save();
        res.redirect('/students');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Server Error');
    }
});

// Route to serve the update form
router.get('/students/update/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('updateStatus', { student });
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Server Error');
    }
});

// Route to handle update form submission
router.post('/students/update/:id', async (req, res) => {
    console.log('Request Body:', req.body); // Add this line for debugging
    const { firstName, lastName, enrollmentID, collegeName, companyName, placed } = req.body;
    try {
        const updatedStudent = {
            firstName,
            lastName,
            enrollmentID,
            collegeName,
            companyName,
            placed: placed === 'true'  // Convert 'true'/'false' to boolean
        };
        await Student.findByIdAndUpdate(req.params.id, updatedStudent);
        res.redirect('/students');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Server Error');
    }
});




router.post('/students/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

