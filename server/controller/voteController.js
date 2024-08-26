const Vote = require('../models/Vote');
const Token = require('../models/Token');
const Candidate = require('../models/Candidates');
const Voter = require('../models/Voter');
const { broadcastVoteUpdate } = require('../app');
const jwt = require('jsonwebtoken');

exports.submitVote = async (req, res) => {
    try {
        const { voterId, votes, token } = req.body;

        // Validate token
        const foundToken = await Token.findOne({ token, voterId, isUsed: false });

        if (!foundToken) {
            return res.status(400).json({ message: 'Invalid or used token' });
        }

        // Ensure voter exists
        const voter = await Voter.findById(voterId);
        if (!voter) {
            return res.status(400).json({ message: 'Voter not found' });
        }

        // Save votes for each candidate
        for (const vote of votes) {
            const candidate = await Candidate.findOne({ name: vote.candidateName });

            if (!candidate) {
                return res.status(400).json({ message: `Candidate ${vote.candidateName} not found` });
            }

            // Increment candidate votes
            candidate.votes += 1;
            await candidate.save();

            // Save the vote record
            const newVote = new Vote({ voterId, candidateName: vote.candidateName, position: vote.position });
            await newVote.save();
        }

        // Mark token as used
        foundToken.isUsed = true;
        await foundToken.save();

        // Broadcast vote updates to all connected clients
        const voteData = await Vote.aggregate([
            { $group: { _id: '$candidateName', count: { $sum: 1 } } }
        ]);

        broadcastVoteUpdate(voteData);

        res.status(200).json({ message: 'Vote submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin route for manipulating votes
exports.manipulateVotes = async (req, res) => {
    try {
        const { candidateName, newVoteCount } = req.body;

        const candidate = await Candidate.findOne({ name: candidateName });
        if (!candidate) {
            return res.status(400).json({ message: 'Candidate not found' });
        }

        candidate.votes = newVoteCount;
        await candidate.save();

        const voteData = await Vote.aggregate([
            { $group: { _id: '$candidateName', count: { $sum: 1 } } }
        ]);

        broadcastVoteUpdate(voteData);

        res.status(200).json({ message: `Vote count for ${candidateName} updated to ${newVoteCount}` });
    } catch (err) {
        res.status500.json({ message: 'Server error', error: err.message });
    }
};



exports.submitVote = async (req, res) => {
    try {
        const { token } = req.body;

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(400).json({ message: 'Invalid or expired token' });

            const foundToken = await Token.findOne({ token, voterId: decoded.id, isUsed: false });

            if (!foundToken) {
                return res.status(400).json({ message: 'Invalid or used token' });
            }

            // Process votes as before

            foundToken.isUsed = true;
            await foundToken.save();

            res.status(200).json({ message: 'Vote submitted successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

