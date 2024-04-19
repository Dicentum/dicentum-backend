const {Debate} = require('../../models/debate');

const updateDebateDetails = (debate, details) => {
    if ('title' in details) debate.title = details.title;
    if ('description' in details) debate.description = details.description;
    if ('date' in details) debate.date = details.date;
    if ('isClosed' in details) debate.isClosed = details.isClosed;
    if ('startDateVote' in details) debate.startDateVote = details.startDateVote;
    if ('endDateVote' in details) debate.endDateVote = details.endDateVote;
};

const editDebate = async function (req, res) {
    try {
        const debate = await Debate.findById(req.params.id.toString());

        if (!debate) {
            return res.status(400).json({ message: "Debate not found" });
        }

        updateDebateDetails(debate, req.body);
        await debate.save();
        res.status(200).json(debate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editDebate };