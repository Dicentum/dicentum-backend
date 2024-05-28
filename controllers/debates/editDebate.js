const {Debate} = require('../../models/debate');
const {checkDebateExists} = require("./validators/checkDebateExists");

const updateDebateDetails = (debate, details) => {
    if ('title' in details) debate.title = details.title;
    if ('description' in details) debate.description = details.description;
    if ('date' in details) debate.date = details.date;
    if ('isClosed' in details) debate.isClosed = details.isClosed;
    if ('startDateVote' in details && !isNaN(Date.parse(details.startDateVote))) debate.startDateVote = details.startDateVote;
    if ('endDateVote' in details && !isNaN(Date.parse(details.endDateVote))) debate.endDateVote = details.endDateVote;
    if('type' in details) debate.type = details.type;
    if('votingDescription' in details) debate.votingDescription = details.votingDescription;
};

const editDebate = async function (req, res) {
    try {
        const debate = await checkDebateExists(req.params.id);

        if (!debate) {
            return res.status(400).json({ message: "Debate not found" });
        }

        updateDebateDetails(debate, req.body);

        if(Date.parse(debate.endDateVote) < Date.parse(debate.startDateVote)){
            return res.status(400).json({ message: "End date vote must be greater than start date vote" });
        }
        if (Date.parse(debate.startDateVote) < Date.now() || Date.parse(debate.endDateVote) < Date.now()) {
            return res.status(400).json({ message: "Vote dates must be in the future" });
        }
        if(Date.parse(debate.date) > Date.parse(debate.startDateVote)){
            return res.status(400).json({ message: "Debate date must be before start date vote" });
        }

        await debate.save();
        res.status(200).json(debate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editDebate };