// server/controller/adminController.js
const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');

// Create a candidate
exports.createCandidate = async (req, res) => {
    try {
        const { name, position } = req.body;
        const newCandidate = new Candidate({ name, position, votes: 0 });
        await newCandidate.save();
        res.status(201).json({ message: 'Candidate created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating candidate', error: error.message });
    }
};

// Change vote outcome for all candidates
exports.updateVoteOutcome = async (req, res) => {
    try {
        const { candidateName, votes } = req.body;
        const candidate = await Candidate.findOne({ name: candidateName });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        candidate.votes = votes;
        await candidate.save();
        res.status(200).json({ message: 'Vote outcome updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vote outcome', error: error.message });
    }
};

// Change total number of votes for each voter
exports.updateVoterVotes = async (req, res) => {
    try {
        const { email, votes } = req.body;
        const voter = await Voter.findOne({ email });
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        voter.totalVotes = votes;
        await voter.save();
        res.status(200).json({ message: 'Voter votes updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating voter votes', error: error.message });
    }
};
