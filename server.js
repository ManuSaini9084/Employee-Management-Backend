const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require(path.join(__dirname, 'routes', 'employeeRoutes'));
const userRoutes = require(path.join(__dirname, 'routes', 'userRoutes'));


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const fs = require('fs');
console.log(fs.readdirSync('./routes')); // Log the contents of the routes directory

// Connect to MongoDB
mongoose.connect('mongodb+srv://manusaini22092003:manu@cluster0.8htxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/employee', employeeRoutes);
app.use('/user', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
