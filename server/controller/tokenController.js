//Generates and validates token
const Token = require('../models/Token');
const { generateToken } = require('../utils/generateToken');
const { sendTokenToEmail } = require('../services/emailService');

exports.generateAndSendToken = async (req, res) => {
    const { voterEmail } = req.body;

    const token = generateToken();
    const newToken = new Token({ token, voterEmail });
    await newToken.save();

    sendTokenToEmail(voterEmail, token);
    res.json({ message: 'Token generated and sent' });
};

exports.validateToken = async (req, res) => {
    const { token, voterEmail } = req.body;

    const foundToken = await Token.findOne({ token, voterEmail, used: false });

    if (foundToken) {
        foundToken.used = true;
        await foundToken.save();
        res.json({ message: 'Token validated successfully' });
    } else {
        res.status(400).json({ message: 'Invalid or used token' });
    }
};
