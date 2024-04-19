const { login } = require('./login')
const { register } = require('./register')
const {validate} = require("./validate");
const {registerKeyStart, registerKeyFinish} = require("./registerKey");

module.exports = {
    login,
    register,
    validate,

    registerKeyStart,
    registerKeyFinish
}