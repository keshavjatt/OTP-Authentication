const User = require('../models/User');
const otpUtils = require('../utils/otpUtils');

exports.registerUser = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};
