const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true,
    },
    candidateName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Vote', voteSchema);
