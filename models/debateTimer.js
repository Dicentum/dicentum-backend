const mongoose = require("mongoose");

const debateTimerSchema = new mongoose.Schema({
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

const DebateTimer = mongoose.model('DebateTimer', debateTimerSchema);

module.exports = DebateTimer;