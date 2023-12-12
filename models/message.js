const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;