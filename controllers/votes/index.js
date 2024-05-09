const {getVotesOfDebate} = require("./getVotesOfDebate");
const {createVote} = require("./createVote");
const {createTally} = require("./createTally");
const {getTally} = require("./getTally");
const {createSecureVote} = require("./createSecureVote")

module.exports = {
    getVotesOfDebate,
    createVote,
    createTally,
    getTally,
    createSecureVote
}