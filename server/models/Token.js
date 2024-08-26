const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h', // Token expires after 1hour
    },
});

module.exports = mongoose.model('Token', tokenSchema);
