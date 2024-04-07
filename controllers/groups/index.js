const {getParliamentaryGroups} = require("./getParliamentaryGroups");
const {postParliamentaryGroup} = require("./postParliamentaryGroup");
const {editParliamentaryGroup} = require("./editParliamentaryGroup");
const {deleteParliamentaryGroup} = require("./deleteParliamentaryGroup");
const {getParliamentaryGroup} = require("./getParliamentaryGroup");
const {requestParliamentaryGroup} = require("./requestParliamentaryGroup");
const {deleteRequestParliamentaryGroup} = require("./deleteRequestParliamentaryGroup");
const {approveRequestParliamentaryGroup} = require("./approveRequestParliamentaryGroup");

module.exports = {
    getParliamentaryGroups,
    postParliamentaryGroup,
    editParliamentaryGroup,
    deleteParliamentaryGroup,
    getParliamentaryGroup,
    requestParliamentaryGroup,
    deleteRequestParliamentaryGroup,
    approveRequestParliamentaryGroup
}