// src/controller/auth.controller.js
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    
    // Use User, not model
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token=jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token_client_side', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register };
