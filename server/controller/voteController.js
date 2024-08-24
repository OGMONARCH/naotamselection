const Candidate = require('../models/Candidate');
const { broadcastVoteUpdate } = require('../utils/socket');

exports.submitVote = async (req, res) => {//Processes the submitted votes by finding each candidate by name and incrementing their vote count. It then sends/shares the updated votes.
    const { votes } = req.body;

    for (const vote of votes) {
        const candidate = await Candidate.findOne({ name: vote.candidateName });
        if (candidate) {
            candidate.votes += 1;
            await candidate.save();
        }
    }

    await broadcastVoteUpdate();
    res.json({ message: 'Votes submitted successfully' });
};
