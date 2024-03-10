const {getParliaments} = require("./getParliaments");
const {getParliament} = require("./getParliament");
const {postParliament} = require("./postParliament");
const {editParliament} = require("./editParliament");

module.exports = {
    getParliaments,
    getParliament,
    postParliament,
    editParliament
}