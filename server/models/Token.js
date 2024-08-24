//schema for token, One time use token, Expires in 1hour
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    voterEmail: { type: String, required: true },
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: '1h' }
});

module.exports = mongoose.model('Token', tokenSchema);
