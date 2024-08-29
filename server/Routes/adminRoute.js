const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');


// console.log('Admin Controller:', adminController);
// console.log('Verify Token Middleware:', verifyToken);

// Define routes
router.post('/signin', adminController.fixedAdminSignin); 
router.post('/create-candidate', verifyToken, adminController.createCandidate);
router.put('/update-vote-outcome', verifyToken, adminController.updateVoteOutcome);
router.put('/update-voter-votes', verifyToken, adminController.updateVoterVotes); 

module.exports = router;
