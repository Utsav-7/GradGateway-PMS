// models/student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Name: String,
    Lastname: String,
    enrollmentID: String,
    collegename: String,
    companyname: String,
    status: { type: String, default: 'On-Hold' } // Add status field
});

module.exports = mongoose.model('Student', StudentSchema);
