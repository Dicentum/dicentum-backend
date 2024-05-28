// connection.js
const mongoose = require('mongoose');
const config = require('../../utils/config');
const printer = require('../../utils/printer');

const connectDB = () => {
    mongoose.connect(config.MONGODB_URI, {})
        .then(() => {
            printer.info('Connection to MongoDB completed!');
        })
        .catch((err) => {
            printer.error('Connection error to MongoDB Atlas:', err);
        });
}

module.exports = connectDB;