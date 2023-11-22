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
        type: String,
        required: true
    }
});

const ParliamentaryGroup = mongoose.model('ParliamentaryGroup', parliamentaryGroupSchema);

module.exports = ParliamentaryGroup;