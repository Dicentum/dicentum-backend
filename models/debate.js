const mongoose = require("mongoose");

const debateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    startDateVote: {
        type: Date,
    },
    endDateVote: {
        type: Date,
    },
    userVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userVotes'
    }],
    parliament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament'
    }
});

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;