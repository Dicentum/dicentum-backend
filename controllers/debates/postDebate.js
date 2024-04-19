const Debate = require("../../models/debate");
const {checkParliamentExists} = require("../parliament/validators/checkParliamentExists");

const postDebate = async function (req, res){
    try {
        const title = req.body.title.toString();
        const description = req.body.description.toString();
        const date = req.body.date.toString();
        const isClosed = req.body.isClosed.toString();
        const parliament = req.body.parliament.toString();

        const parliamentExists = await checkParliamentExists(parliament);
        if (!parliamentExists) {
            return res.status(400).json({ message: "Parliament does not exist" });
        }
        const startDateVote = req.body.startDateVote.toString();
        const endDateVote = req.body.endDateVote.toString();

        const newDebate = new Debate({
            title,
            description,
            date,
            isClosed,
            parliament,
            startDateVote,
            endDateVote
        });

        await newDebate.save();

        res.status(201).json(newDebate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postDebate};