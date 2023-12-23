const express = require("express");
const router = express.Router();
const User = require('../models/User');
const authController = require('../controller/authController');

const {getbill,signup} = require("../controller/appController");

router.get('/api/User', async (req, res) => {
  try {
    // Fetch user details from the database
    const users = await User.find();

    // Respond with the user details
    res.json(users);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/getbill', getbill);
router.post('/user/signup', signup);
router.post('/login', authController.login);
module.exports = router;
