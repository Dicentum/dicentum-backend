const {getParliamentaryGroups} = require("./getParliamentaryGroups");
const {postParliamentaryGroup} = require("./postParliamentaryGroup");
const {editParliamentaryGroup} = require("./editParliamentaryGroup");
const {deleteParliamentaryGroup} = require("./deleteParliamentaryGroup");
const {getParliamentaryGroup} = require("./getParliamentaryGroup");

module.exports = {
    getParliamentaryGroups,
    postParliamentaryGroup,
    editParliamentaryGroup,
    deleteParliamentaryGroup,
    getParliamentaryGroup
}