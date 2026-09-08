
# AUTHENTICATION API

A Node.js backend project implementing user authentication and post creation using **Express**, **JWT**, and **MongoDB**.

---

## 📖 Description
This project demonstrates a simple authentication flow:
- **Register** a new user
- **Login** with credentials to receive a JWT stored in a cookie
- **Create posts** only if authenticated

It uses Express routers, JWT for authentication, and MongoDB with Mongoose for user storage.

---

## 🚀 Features
- User registration (no token issued at registration)
- User login (JWT generated and stored in cookie)
- Protected post creation route
- Organized project structure with controllers, models, and routes

---



---

# 📌 Using `.env` Files in Node.js Projects

## 🔹 What is an `.env` File?
- `.env` stands for **environment file**.  
- It stores **environment variables** (like database URLs, API keys, and secret tokens).  
- These values are loaded into your app at runtime, so you don’t hardcode sensitive data in your code.  

Example `.env` file:
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydb
JWT_SECRET=mySuperSecretKey
```

---

## 🔹 Why Use `.env`?
- **Security** → Keeps secrets (like DB passwords) out of your code.  
- **Flexibility** → Change values without editing source code.  
- **Portability** → Different environments (development, testing, production) can have different `.env` files.  

---

## 🔹 Step 1: Install dotenv
```bash
npm install dotenv
```

---

## 🔹 Step 2: Create `.env` File
In the root of your project, create a file named `.env`:
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydb
```

---

## 🔹 Step 3: Load `.env` in Your Code
At the top of `server.js` or `app.js`, add:
```js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Use environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## 🔹 Step 4: Ignore `.env` in Git
Add `.env` to `.gitignore` so it’s not pushed to GitHub:
```
# Ignore environment variables
.env
```

---

## 🔹 Step 5: Share `.env.example`
Create a `.env.example` file to show teammates what variables they need:
```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---


