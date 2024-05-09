const {checkDebateExists} = require("../debates/validators/checkDebateExists");
const userVotes = require("../../models/userVotes");
const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const Parliament = require("../../models/parliament");

const createVote = async (req, res) => {
    try{
        if(!req.body.vote) return res.status(400).json({ message: "Vote not found" });

        const debate = await checkDebateExists(req.params.id.toString());
        const user = req.user._id;
        const vote = req.body.vote.toString();

        const now = Date.now();

        if(!debate) return res.status(404).json({ message: "Debate not found" });

        const userRegistered = await User.findById(user);
        const parliamentaryGroup = await ParliamentaryGroup.findById(userRegistered.parliamentaryGroup);
        if(!parliamentaryGroup) return res.status(404).json({ message: "An error occurred E1" });
        const parliament = await Parliament.findById(parliamentaryGroup.parliament);
        if(!parliament) return res.status(404).json({ message: "An error occurred E2" });
        const debates = parliament.debates;
        if(!debates.includes(debate._id)) return res.status(404).json({ message: "An error occurred E3" });


        if(debate.isClosed) return res.status(400).json({ message: "Debate is closed" });
        if (now < debate.startDateVote) return res.status(400).json({ message: "Voting has not started yet" });
        if (now > debate.endDateVote) return res.status(400).json({ message: "Voting has ended" });

        const newVote = new userVotes({
            user,
            vote,
            debate: debate._id
        });
        await newVote.save();

        res.status(201).json(newVote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = { createVote };