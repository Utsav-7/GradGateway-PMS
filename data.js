// const bcrypt = require('bcrypt');

// // List of companies
// const companies = [
//   "google", "aws", "goldman sach", "JP Morgan", "Morgan Stanley", "HCL Tech", 
//   "Capgemini", "Cognizant", "Accenture", "IBM", "Microsoft", "Celebal Technologies", 
//   "Hexaware Software", "Cygnet Infotech", "Codal Infotech", "Tatvasoft", "Atom technologies", 
//   "WeeTech Solution", "Sophos Solution", "Collabera Technologies"
// ];

// // Function to generate a data object for a company
// const generateCompanyData = (company) => {
//   const enrollmentID = company.toLowerCase().replace(/ /g, ''); // remove spaces and convert to lowercase
//   const email = `recruiters@${enrollmentID}.in`;
//   const password = bcrypt.hashSync(enrollmentID, 10); // hashing the enrollmentID as a simple example

//   return {
//     userType: "Company",
//     enrollmentID,
//     email,
//     password,
//   };
// };

// // Generate data objects for each company
// const generatedData = companies.map(company => generateCompanyData(company));

// // Log the generated data
// console.log(JSON.stringify(generatedData, null, 2));


// STUDENT JSON DATA GENERATOR
const bcrypt = require('bcrypt');

// Function to generate a data object for a student
const generateStudentData = (index) => {
  const enrollmentID = `21DCE00${index}`;
  const email = `${enrollmentID.toLowerCase()}@charusat.edu.in`;
  const password = bcrypt.hashSync(enrollmentID, 10); // hashing the enrollmentID as a simple example

  return {
    userType: "Student",
    enrollmentID,
    email,
    password,
  };
};

// Generate data objects for 20 students
const generatedStudentData = Array.from({ length: 50 }, (_, index) => generateStudentData(index + 1));

// Log the generated data
console.log(JSON.stringify(generatedStudentData, null, 2));
