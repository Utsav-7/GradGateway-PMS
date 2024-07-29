const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    enrollmentID: String,
    collegeName: String,
    companyName: String,
    placed: Boolean
});

module.exports = mongoose.model('Student', StudentSchema);
