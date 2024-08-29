const Admin = require('../models/Admin');
const Candidate = require('../models/Candidates');
const Voter = require('../models/Voter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials (for development/testing only)
const FIXED_ADMIN_EMAIL = 'admin@example.com';
const FIXED_ADMIN_PASSWORD = 'securepassword'; 

// Fixed Admin Signin
exports.fixedAdminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check against hardcoded credentials
        if (email !== FIXED_ADMIN_EMAIL || password !== FIXED_ADMIN_PASSWORD) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token for the admin
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Admin sign-in successful', token });
    } catch (err) {
        console.error('Error during fixed admin sign-in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create a candidate
exports.createCandidate = async (req, res) => {
    try {
        const { name, position } = req.body;

        // Validate input
        if (!name || !position) {
            return res.status(400).json({ message: 'Name and position are required' });
        }

        // Create new candidate
        const newCandidate = new Candidate({ name, position, votes: 0 });
        await newCandidate.save();

        res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
    } catch (error) {
        console.error('Error creating candidate:', error);
        res.status(500).json({ message: 'Error creating candidate', error: error.message });
    }
};

// Update vote outcome for a candidate
exports.updateVoteOutcome = async (req, res) => {
    try {
        const { candidateName, votes } = req.body;

        // Validate input
        if (!candidateName || votes === undefined) {
            return res.status(400).json({ message: 'Candidate name and votes are required' });
        }

        // Find candidate by name
        const candidate = await Candidate.findOne({ name: candidateName });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update votes and save
        candidate.votes = votes;
        await candidate.save();

        res.status(200).json({ message: 'Vote outcome updated successfully', candidate });
    } catch (error) {
        console.error('Error updating vote outcome:', error);
        res.status(500).json({ message: 'Error updating vote outcome', error: error.message });
    }
};

// Update total votes for a voter
exports.updateVoterVotes = async (req, res) => {
    try {
        const { email, votes } = req.body;

        // Validate input
        if (!email || votes === undefined) {
            return res.status(400).json({ message: 'Email and votes are required' });
        }

        // Find voter by email
        const voter = await Voter.findOne({ email });
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Update total votes and save
        voter.totalVotes = votes;
        await voter.save();

        res.status(200).json({ message: 'Voter votes updated successfully', voter });
    } catch (error) {
        console.error('Error updating voter votes:', error);
        res.status(500).json({ message: 'Error updating voter votes', error: error.message });
    }
};
