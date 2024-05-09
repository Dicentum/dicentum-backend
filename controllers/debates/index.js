const {getDebates} = require('./getDebates');
const {getDebate} = require('./getDebate');
const {postDebate} = require('./postDebate');
const {editDebate} = require('./editDebate');
const {deleteDebate} = require("./deleteDebate");

module.exports = {
    getDebates,
    getDebate,
    postDebate,
    editDebate,
    deleteDebate
}