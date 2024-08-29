const Token = require('../models/Token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate and send token
exports.generateToken = async (req, res) => {
    try {
        const { voterId, email } = req.body;

        // Generate a random token
        const token = crypto.randomBytes(20).toString('hex');

        // Create a new token entry in the database
        const newToken = new Token({ token, voterId });
        await newToken.save();

        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'aa.its3673@gmail.com', // using the provided email
                // pass: '' // Passkey is omitted
            },
        });

        // Set up email options
        const mailOptions = {
            to: email,
            from: 'aa.its3673@gmail.com',
            subject: 'Voting Token',
            text: `Your voting token is: ${token}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ message: 'Token sent successfully' });
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
