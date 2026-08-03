const express = require('express');
const authroutes = require('./routes/auth.routes.js');    
const cookieParser = require('cookie-parser'); // ✅ Correct spelling
const postroutes = require('./routes/post.routes.js'); // ✅ Correct spelling

const app = express();
app.use(express.json());

app.use(cookieParser()); // ✅ Matches the variable name

app.use('/api/auth', authroutes);
app.use('/api/post', postroutes);  //same names should be used for both the variable and the route path in postman

module.exports = app;
