// connection.js
const mongoose = require('mongoose');
const config = require('../../utils/config');
const printer = require('../../utils/printer');

const connectDBTest = () => {
    mongoose.connect(config.MONGODB_URI, {})
        .catch((err) => {
            printer.error('Connection error to MongoDB Atlas:', err);
        });
}

module.exports = connectDBTest;