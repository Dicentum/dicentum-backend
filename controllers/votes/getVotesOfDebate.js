const userVotes = require("../../models/userVotes");

const getVotesOfDebate = async function (req, res) {
    try{
        const { id } = req.params;
        const votes = await userVotes.find({ debate: id.toString() });
        return res.status(200).json(votes);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getVotesOfDebate };