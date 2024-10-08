const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
    },
    matricNumber: {
        type: String,
        required: true,
        unique: true,
    },
    hasVoted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Voter', voterSchema);
