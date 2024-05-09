const mongoose = require("mongoose");

const UserVotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    },
    vote: {
        type: String,
        required: true
    },
});

const UserVotes = mongoose.model('userVotes', UserVotesSchema);

module.exports = UserVotes;