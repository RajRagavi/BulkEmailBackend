require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const appRoute = require('./routes/route');
const authController = require('./controller/authController');
const cors = require('cors');


const User = require('./models/User');
const Email = require('./models/Email');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/user', authController.user);
app.use('/api',appRoute)
app.get('/', (req, res) => {
  
  const message = '<h1>Hello, World!</h1>';

  // Send the message as a response
  res.send(message);
});

// Protected Route Example
app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Middleware to authenticate user using JWT
function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/save-email', async (req, res) => {
  try {
    const { userEmail } = req.body;
    const newEmail = new Email({ userEmail });
    await newEmail.save();
    res.status(201).json({ message: 'Email saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
