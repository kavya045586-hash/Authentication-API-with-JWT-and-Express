// routes/auth.routes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

const router = express.Router();

// Register (no token here)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new userModel({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login (generate token here)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token_client_side', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
});

module.exports = router;
