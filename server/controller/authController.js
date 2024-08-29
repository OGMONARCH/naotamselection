const Voter = require('../models/Voter');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Hardcoded admin credentials (for development/testing only)
const FIXED_ADMIN_EMAIL = 'admin@example.com';
const FIXED_ADMIN_PASSWORD = 'securepassword'; 

// Sign In (Voter)
exports.signIn = async (req, res) => {
    try {
        const { email, matricNumber } = req.body;

        // Validate input data
        if (!email || !matricNumber) {
            return res.status(400).json({ message: 'Email and Matric Number are required' });
        }

        // Check if the voter exists
        let voter = await Voter.findOne({ email, matricNumber });

        // If not, create a new voter
        if (!voter) {
            voter = new Voter({ email, matricNumber });
            await voter.save();
        }

        res.status(200).json({ message: 'Sign in successful', voter });
    } catch (err) {
        // Log the error and respond with a server error message
        console.error('Error during voter sign-in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Fixed Admin Sign In (for development/testing only)
exports.fixedAdminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check against hardcoded credentials
        if (email !== FIXED_ADMIN_EMAIL || password !== FIXED_ADMIN_PASSWORD) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token for the admin
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: 'Admin sign-in successful', token });
    } catch (err) {
        // Log the error and respond with a server error message
        console.error('Error during fixed admin sign-in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
