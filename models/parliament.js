const mongoose = require("mongoose");

const parliamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parliamentaryGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParliamentaryGroup'
    }],
    debates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }]
});

const Parliament = mongoose.model('Parliament', parliamentSchema);

module.exports = Parliament;