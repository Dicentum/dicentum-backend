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
    voting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voting'
    },
    parliament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament'
    }
});

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;