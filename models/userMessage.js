const mongoose = require("mongoose");

const UserMessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    },
    content: {
        type: String,
        required: true
    },
},{ timestamps: true }
);

const UserMessage = mongoose.model('userMessage', UserMessageSchema);

module.exports = UserMessage;