const express = require('express');
const { generateAndSendToken, validateToken } = require('../controllers/tokenController');

const router = express.Router();

router.post('/generate', generateAndSendToken);
router.post('/validate', validateToken);

module.exports = router;
