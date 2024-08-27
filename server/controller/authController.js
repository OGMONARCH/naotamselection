const Voter = require('../models/Voter');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.signIn = async (req, res) => {
    try {
        const { email, matricNumber } = req.body;

        let voter = await Voter.findOne({ email, matricNumber });

        if (!voter) {
            voter = new Voter({ email, matricNumber });
            await voter.save();
        }

        res.status(200).json({ message: 'Sign in successful', voter });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !admin.validatePassword(password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
};

