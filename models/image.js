const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;