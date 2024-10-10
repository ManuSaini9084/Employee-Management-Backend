const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true }, // Ensure unique username
  email: { type: String, required: true, unique: true }, // Add an email field for user contact
  password: { type: String, required: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('User', userSchema);
