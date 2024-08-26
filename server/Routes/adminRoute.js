// routes/adminRoute.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all admin routes with JWT verification and admin check
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verifyAdmin);

router.post('/manipulateAllVotes', adminController.manipulateAllVotes);
router.post('/changeVoterVotes', adminController.changeVoterVotes);
router.post('/createCandidate', adminController.createCandidate);

module.exports = router;
