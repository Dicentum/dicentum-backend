const {getParliamentaryGroups} = require("./getParliamentaryGroups");
const {postParliamentaryGroup} = require("./postParliamentaryGroup");
const {putParliamentaryGroup} = require("./editParliamentaryGroup");
const {deleteParliamentaryGroup} = require("./deleteParliamentaryGroup");
const {getParliamentaryGroup} = require("./getParliamentaryGroup");

module.exports = {
    getParliamentaryGroups,
    postParliamentaryGroup,
    putParliamentaryGroup,
    deleteParliamentaryGroup,
    getParliamentaryGroup
}