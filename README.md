
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


---

# 📌 Express Project Structure – Simple Explanation

## 🔹 Why Separate Files?
- **app.js** → sets up the Express app and connects routes.  
- **Routes** → define API endpoints (URLs + HTTP methods).  
- **Controllers** → contain the actual logic (CRUD operations, database calls).  

This keeps the project **organized and easy to maintain**.

---

## 🔹 Project Structure
```
project/
│── app.js
│── server.js
│── models/
│   └── note.model.js
│── routes/
│   └── note.routes.js
│── controllers/
│   └── note.controller.js
│── .env
│── package.json
```

---

## 🔹 app.js
```js
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Import routes
const noteRoutes = require('./routes/note.routes.js');

// Use routes
app.use('/notes', noteRoutes);

module.exports = app;
```
👉 `app.js` mounts the routes at `/notes`.

---

## 🔹 routes/note.routes.js
```js
const express = require('express');
const router = express.Router();

// Import controller functions
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/note.controller.js');

// Define endpoints
router.post('/', createNote);     // POST /notes
router.get('/', getNotes);        // GET /notes
router.patch('/:id', updateNote); // PATCH /notes/:id
router.delete('/:id', deleteNote);// DELETE /notes/:id

module.exports = router;
```
👉 Routes only **map URLs to controller functions**.

---

## 🔹 controllers/note.controller.js
```js
const Note = require('../models/note.model.js');

// Create
const createNote = async (req, res) => {
  const data = req.body;
  const newNote = await Note.create({ title: data.title, description: data.description });
  res.status(201).json({ message: "✅ Note created", note: newNote });
};

// Read
const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: "✅ Notes fetched successfully", notes });
};

// Update
const updateNote = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json({ message: "Note updated successfully", note: updatedNote });
};

// Delete
const deleteNote = async (req, res) => {
  const id = req.params.id;
  const deletedNote = await Note.findOneAndDelete({ _id: id });
  res.status(200).json({ message: "✅ Note deleted successfully", note: deletedNote });
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
```
👉 Controllers contain the **business logic** (CRUD with MongoDB).

---

## 🔹 Flow
1. **Frontend/User** → calls an endpoint (e.g., `POST /notes`).  
2. **app.js** → forwards request to `note.routes.js`.  
3. **Routes** → call the correct controller.  
4. **Controller** → runs logic (save, fetch, update, delete).  
5. **MongoDB** → stores or retrieves data.  
6. **Backend Response** → sends JSON back to frontend.  

---

## ⚡ Summary
- **app.js** → sets up Express and mounts routes.  
- **Routes** → define endpoints.  
- **Controllers** → handle logic.  
- Together, they make your backend **modular and professional**.  

---

