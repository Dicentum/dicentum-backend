const mongoose = require("mongoose");

const parliamentaryGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "No description"
    },
    color: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    seats: {
        type: Number,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requestedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    parliament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament'
    }
});

const ParliamentaryGroup = mongoose.model('ParliamentaryGroup', parliamentaryGroupSchema);

module.exports = ParliamentaryGroup;