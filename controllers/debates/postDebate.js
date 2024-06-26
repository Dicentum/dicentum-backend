const Debate = require("../../models/debate");
const {checkParliamentExists} = require("../parliament/validators/checkParliamentExists");

const postDebate = async function (req, res){
    try {
        const title = req.body.title.toString();
        const description = req.body.description.toString();
        const date = req.body.date.toString();
        const isClosed = req.body.isClosed.toString();
        const parliament = req.body.parliament.toString();
        let type = req.body.type.toString();

        let votingDescription = "No description provided";
        if(req.body.votingDescription) {
            votingDescription = req.body.votingDescription.toString();
        }

        const parliamentExists = await checkParliamentExists(parliament);
        if (!parliamentExists) {
            return res.status(400).json({ message: "Parliament does not exist" });
        }

        if(type != "online" && type != "presential"){
            type = "presential";
        }

        let newDebate;
        if(isClosed == "true"){
            newDebate = new Debate({
                title,
                description,
                date,
                isClosed,
                parliament,
                type,
                votingDescription
            });
        } else {
            if(!req.body.startDateVote || !req.body.endDateVote){
                return res.status(400).json({ message: "Start date vote and end date vote are required" });
            }

            const startDateVote = req.body.startDateVote.toString();
            const endDateVote = req.body.endDateVote.toString();

            if(Date.parse(endDateVote) < Date.parse(startDateVote)){
                return res.status(400).json({ message: "End date vote must be greater than start date vote" });
            }
            if (Date.parse(startDateVote) < Date.now() || Date.parse(endDateVote) < Date.now()) {
                return res.status(400).json({ message: "Vote dates must be in the future" });
            }
            if(Date.parse(date) > Date.parse(startDateVote)){
                return res.status(400).json({ message: "Debate date must be before start date vote" });
            }

            newDebate = new Debate({
                title,
                description,
                date,
                isClosed,
                parliament,
                startDateVote,
                endDateVote,
                type,
                votingDescription
            });
        }

        parliamentExists.debates.push(newDebate._id);

        await newDebate.save();
        await parliamentExists.save();

        res.status(201).json(newDebate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postDebate};