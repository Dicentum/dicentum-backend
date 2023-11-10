require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

module.exports = {
    MONGODB_URI,
    PORT,
    MODE
}