// controller/adminController.js
const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');
const Vote = require('../models/Vote');

// Change the outcome of votes for all candidates
exports.manipulateAllVotes = async (req, res) => {
    try {
        const { candidatesVotes } = req.body; // Expecting an array of { candidateName, newVoteCount }

        for (const { candidateName, newVoteCount } of candidatesVotes) {
            const candidate = await Candidate.findOne({ name: candidateName });
            if (!candidate) {
                return res.status(404).json({ message: `Candidate ${candidateName} not found` });
            }

            candidate.votes = newVoteCount;
            await candidate.save();
        }

        res.status(200).json({ message: 'Votes updated successfully for all candidates' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Change the total number of votes for each voter
exports.changeVoterVotes = async (req, res) => {
    try {
        const { voterId, newVoteCount } = req.body;

        const voter = await Voter.findById(voterId);
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        voter.totalVotes = newVoteCount;
        await voter.save();

        res.status(200).json({ message: 'Voter vote count updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create candidates for various positions
exports.createCandidate = async (req, res) => {
    try {
        const { name, position } = req.body;

        const existingCandidate = await Candidate.findOne({ name, position });
        if (existingCandidate) {
            return res.status(400).json({ message: 'Candidate already exists for this position' });
        }

        const newCandidate = new Candidate({ name, position, votes: 0 });
        await newCandidate.save();

        res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
