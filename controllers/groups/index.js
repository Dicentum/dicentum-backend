const {getParliamentaryGroup} = require("./getParliamentaryGroup");
const {postParliamentaryGroup} = require("./postParliamentaryGroup");
const {putParliamentaryGroup} = require("./editParliamentaryGroup");
const {deleteParliamentaryGroup} = require("./deleteParliamentaryGroup");

module.exports = {
    getParliamentaryGroup,
    postParliamentaryGroup,
    putParliamentaryGroup,
    deleteParliamentaryGroup
}