const mongoose = require("mongoose");

const messageTimerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }
});

const MessageTimer = mongoose.model('MessageTimer', messageTimerSchema);

module.exports = MessageTimer;