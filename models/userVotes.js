const mongoose = require("mongoose");

const UserVotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vote: {
        type: String,
        enum: ['yes', 'no', 'abstain', 'not present'],
        default: 'not present',
        required: true
    },
});

const UserVotes = mongoose.model('userVotes', UserVotesSchema);

module.exports = UserVotes;