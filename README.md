
---

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

## 🔹 Steps
1. Install dotenv  
   ```bash
   npm install dotenv
   ```
2. Create `.env` file in project root.  
3. Load `.env` in your code:
   ```js
   require('dotenv').config();
   const PORT = process.env.PORT;
   const MONGO_URI = process.env.MONGO_URI;
   ```
4. Ignore `.env` in Git (`.gitignore`).  
5. Share `.env.example` for teammates.  

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

---

## 🔹 routes/note.routes.js
```js
const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/note.controller.js');

router.post('/', createNote);
router.get('/', getNotes);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
```

---

## 🔹 controllers/note.controller.js
```js
const Note = require('../models/note.model.js');

const createNote = async (req, res) => {
  const data = req.body;
  const newNote = await Note.create({ title: data.title, description: data.description });
  res.status(201).json({ message: "✅ Note created", note: newNote });
};

const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: "✅ Notes fetched successfully", notes });
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json({ message: "Note updated successfully", note: updatedNote });
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const deletedNote = await Note.findOneAndDelete({ _id: id });
  res.status(200).json({ message: "✅ Note deleted successfully", note: deletedNote });
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
```

---

## 🔹 Flow
1. **Frontend/User** → calls an endpoint (e.g., `POST /notes`).  
2. **app.js** → forwards request to `note.routes.js`.  
3. **Routes** → call the correct controller.  
4. **Controller** → runs logic (save, fetch, update, delete).  
5. **MongoDB** → stores or retrieves data.  
6. **Backend Response** → sends JSON back to frontend.  

---

# 📌 Using JWT with Cookies (`req.cookies.token_client_side`)

## 🔹 Setup
1. Install cookie-parser:
   ```bash
   npm install cookie-parser
   ```
2. Add middleware in `app.js`:
   ```js
   const cookieParser = require('cookie-parser');
   app.use(cookieParser());
   ```

---

## 🔹 Setting JWT in a Cookie
```js
app.post('/login', (req, res) => {
  const user = { id: 1, name: "Kavya" }; // dummy user
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token_client_side', token, { httpOnly: true });
  res.json({ message: "✅ Login successful, token stored in cookie" });
});
```

---

## 🔹 Reading & Verifying JWT from Cookie
```js
app.get('/profile', (req, res) => {
  const token = req.cookies.token_client_side;
  if (!token) return res.status(401).json({ message: "❌ No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "✅ Token valid", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "❌ Invalid or expired token" });
  }
});
```

---

## 🔹 Flow
1. **Login** → server generates JWT and sets it in a cookie (`token_client_side`).  
2. **Browser stores cookie** → automatically sent with future requests.  
3. **Protected route** → server reads `req.cookies.token_client_side`.  
4. **Verify** → if valid, access granted; if invalid, access denied.  

---

## ⚡ Summary
- `.env` → keep secrets safe.  
- **Routes** → define endpoints.  
- **Controllers** → handle logic.  
- **JWT** → `jwt.sign()` to create, `jwt.verify()` to check.  
- **cookie-parser** → read/write cookies easily.  
- Together → clean, modular, secure backend.  

---

