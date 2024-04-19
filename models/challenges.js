const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    challenge: {
        type: String,
        required: true
    }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;