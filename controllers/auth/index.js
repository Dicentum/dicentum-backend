const { login } = require('./login')
const { register } = require('./register')
const {validate} = require("./validate");

module.exports = {
    login,
    register,
    validate
}