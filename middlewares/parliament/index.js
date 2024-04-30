const { validateAdminUser } = require("./validateAdminUser");
const { validateTotalSeats } = require("./validateTotalSeats");
const { validatePartialSeats } = require("./validatePartialSeats");

module.exports = {
    validateAdminUser,
    validateTotalSeats,
    validatePartialSeats
}