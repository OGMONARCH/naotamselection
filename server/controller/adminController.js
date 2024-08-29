const Admin = require('../models/Admin');
const Candidate = require('../models/Candidates');
const Voter = require('../models/Voter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Signup
exports.adminSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ message: 'Admin signup successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin Signin
exports.adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: 'Admin signin successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

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

// Update vote outcome for a candidate
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

// Update total votes for a voter
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
