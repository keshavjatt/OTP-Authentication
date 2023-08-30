const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  otp: String,
  otpExpiry: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
