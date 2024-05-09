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
    votingDescription: {
        type: String,
        default: 'Without voting description',
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
    type: {
        type: String,
        enum: ['online', 'presential'],
        default: 'online'
    },
    timers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DebateTimer'
    }],
    debateResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DebateResult'
    },
    parliament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament'
    }
});

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;