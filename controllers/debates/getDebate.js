const Debate = require("../../models/debate");

const getDebate = async function (req, res) {
    try{
        const { id } = req.params;
        const debate = await Debate.findById(id.toString());
        return res.status(200).json(debate);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getDebate };