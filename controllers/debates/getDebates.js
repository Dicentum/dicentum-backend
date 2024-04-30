const Debate = require("../../models/debate");

const getDebates = async function (req, res, next) {
    try{
        const debates = await Debate.find({});
        return res.status(200).json(debates);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getDebates };