const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    userVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userVotes'
    }],
});

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;