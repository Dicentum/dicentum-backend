const {SECRET_SESSION} =  require('./config.js');
const session = require('express-session');

const setupSession = (app) => {
    app.use(session({
        secret: SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
        }
    }));
};

module.exports = { setupSession };