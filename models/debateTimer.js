const mongoose = require("mongoose");

const debateTimerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: false,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }
});

const DebateTimer = mongoose.model('DebateTimer', debateTimerSchema);

module.exports = DebateTimer;