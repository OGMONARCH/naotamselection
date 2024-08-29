const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');

router.post('/signup', adminController.adminSignup);
router.post('/signin', adminController.adminSignin);
router.post('/create-candidate', verifyToken, adminController.createCandidate);
router.put('/update-vote-outcome', verifyToken, adminController.updateVoteOutcome);
router.put('/update-voter-votes', verifyToken, adminController.updateVoterVotes);

module.exports = router;
