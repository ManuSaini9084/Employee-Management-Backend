const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

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
