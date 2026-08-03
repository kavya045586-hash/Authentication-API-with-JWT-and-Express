const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

const router = express.Router();

// POST /api/post/create
router.post('/create',  async (req, res) => {
    const token = req.cookies.token_client_side;
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user=await userModel.findById(decoded.id);
    console.log(user);

    if(!decoded) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    // Token is valid, proceed with post creation

        const { title, content } = req.body;

        // Here you would typically save the post to the database
        // For demonstration, we'll just return the post data
        res.status(201).json({ message: 'Post created successfully', post: { title, content, userId: decoded.id } });
    }

);


module.exports = router;

