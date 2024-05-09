const mongoose = require("mongoose");

const debateResultSchema = new mongoose.Schema({
    affirmativeVotes: {
        type: Number,
        default: 0
    },
    negativeVotes: {
        type: Number,
        default: 0
    },
    abstentionVotes: {
        type: Number,
        default: 0
    },
    notPresent: {
        type: Number,
        default: 0
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate',
        unique: true
    }
});

const DebateResult = mongoose.model('DebateResult', debateResultSchema);

module.exports = DebateResult;