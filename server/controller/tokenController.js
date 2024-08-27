const Token = require('../models/Token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.generateToken = async (req, res) => {
    try {
        const { voterId, email } = req.body;

        const token = crypto.randomBytes(20).toString('hex');

        const newToken = new Token({ token, voterId });
        await newToken.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                // pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Voting Token',
            text: `Your voting token is: ${token}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Token sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
