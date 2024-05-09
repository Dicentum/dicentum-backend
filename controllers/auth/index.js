const { login } = require('./login')
const { register } = require('./register')
const {validate} = require("./validate");
const {registerKeyStart, registerKeyFinish} = require("./registerKey");
const {loginKeyStart, loginKeyFinish} = require("./loginKey");
const {getPublicKey} = require("./publicKey");

module.exports = {
    login,
    register,
    validate,

    registerKeyStart,
    registerKeyFinish,
    loginKeyStart,
    loginKeyFinish,

    getPublicKey
}