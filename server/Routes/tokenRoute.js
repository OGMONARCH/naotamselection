const express = require('express');
const router = express.Router();
const tokenController = require('../controller/tokenController');

router.post('/generate', tokenController.generateToken);

module.exports = router;
