// server/controller/voteController.js
const Vote = require('../models/Vote');
const Token = require('../models/Token');
const { broadcastVoteUpdate } = require('../app');

exports.submitVote = async (req, res) => {
    try {
        const { voterId, votes, token } = req.body;

        const foundToken = await Token.findOne({ token, voterId, isUsed: false });

        if (!foundToken) {
            return res.status(400).json({ message: 'Invalid or used token' });
        }

        for (const vote of votes) {
            const newVote = new Vote({ voterId, candidateName: vote.candidateName, position: vote.position });
            await newVote.save();
        }

        foundToken.isUsed = true;
        await foundToken.save();

        const voteData = await Vote.aggregate([
            { $group: { _id: '$candidateName', count: { $sum: 1 } } }
        ]);

        broadcastVoteUpdate(voteData);

        res.status(200).json({ message: 'Vote submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
