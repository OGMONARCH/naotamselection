const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Sign-in route
router.post('/signin', authController.signIn);

// Export the router
module.exports = router;
