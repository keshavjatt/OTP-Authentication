const User = require('../models/User');
const otpUtils = require('../utils/otpUtils');
const config = require('../config/config');
const twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = otpUtils.generateOTP();

    // Save OTP and its expiry to the user's record
    await User.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiry: new Date(Date.now() + 10 * 60000) } // OTP valid for 10 minutes
    );

    // Send OTP via Twilio
    await twilio.messages.create({
      body: `Your OTP is: ${otp}`,
      from: config.twilio.phoneNumber,
      to: phoneNumber,
    });

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred',error });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, perform user login

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};
