const express = require('express');
const multer = require('multer');
const Employee = require('../models/employee');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file.path; 

  try {
    const newEmployee = new Employee({
      name,
      email,
      mobileNo: mobile,
      designation,
      gender,
      course,
      image,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating employee. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const { name, email, mobileNo, designation, gender, course } = req.body;

    if (employee.email !== email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) return res.status(400).json({ message: "Email already exists" });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobileNo = mobileNo || employee.mobileNo;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.image = req.file ? req.file.path : employee.image; // Update only if a new file is uploaded

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an employee
const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {
  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Use findByIdAndDelete method to delete the employee
    const employee = await Employee.findByIdAndDelete(req.params.id);

    // If no employee is found, return a 404 error
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Send a success response
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;