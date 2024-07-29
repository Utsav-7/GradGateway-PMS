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


module.exports = router;
