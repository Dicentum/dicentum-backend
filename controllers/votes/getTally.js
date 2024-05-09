const {checkDebateExists} = require("../debates/validators/checkDebateExists");
const debateResult = require("../../models/debateResult");
const Parliament = require("../../models/parliament");

const getTally = async (req, res) => {
    try {
        const { id } = req.params;
        const debate = await checkDebateExists(id);
        const tally = debate.debateResult;
        const result = await debateResult.findById(tally);

        if(!result) return res.status(404).json({ message: "Tally not found" });
        const response = result.toObject();

        const emittedVotes = result.affirmativeVotes + result.negativeVotes + result.abstentionVotes;
        response.emittedVotes = emittedVotes;

        const parliament = await Parliament.findById(debate.parliament);
        const totalSeats = parliament.totalSeats;
        response.totalSeats = totalSeats;

        return res.status(200).json(response);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = { getTally };