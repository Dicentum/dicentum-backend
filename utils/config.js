require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
const ORIGIN = process.env.ORIGIN;

module.exports = {
    MONGODB_URI,
    PORT,
    MODE,
    ORIGIN
}