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
    parliament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament'
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

const Debate = mongoose.model('Debate', debateSchema);

module.exports = Debate;