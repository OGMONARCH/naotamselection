const express = require('express');
const router = express.Router();
const voteController = require('../controller/voteController');

// Route to submit a vote
router.post('/submit', voteController.submitVote);

// Route for admin to manipulate votes
router.post('/manipulate', voteController.manipulateVotes);

//Route for Cast Vote 
router.post('/cast-vote', voteController.castVote);

module.exports = router;
