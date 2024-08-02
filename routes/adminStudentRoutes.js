const express = require('express');
const router = express.Router();
const placement = require('../models/studentjobform.js');

// Route to render the update page with current user details
router.get('/updateStudent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching user with ID:', id);

        const user = await placement.findOne({ enrollmentID: id });
        if (!user) return res.status(404).send('User not found');

        res.render('updateStudent', { user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
});

// Route to handle form submission for updating user details
router.post('/updateStudent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, college, company } = req.body;

        console.log('Updating user with ID:', id);

        const updatedUser = await placement.findOneAndUpdate(
            { enrollmentID: id },
            {
                Name: name,
                Lastname: lastname,
                collegename: college,
                comapanyname: company  // Update the company name
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) return res.status(404).send('User not found');

        console.log('User updated:', updatedUser);

        // Fetch updated data and render the admin page
        const alldata = await placement.find();
        res.render('admin', { alldata });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Server error');
    }
});

// Route to handle deleting a student
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting user with ID:', id);

        const del = await placement.deleteOne({ enrollmentID: id });
        console.log('Delete result:', del);

        // Fetch updated data and render the admin page
        const alldata = await placement.find();
        res.render('admin', { alldata });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;

