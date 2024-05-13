const userMessage = require("../../models/userMessage");

const getMessagesOfDebate = async function (req, res) {
    try{
        const { id } = req.params;
        const messages = await userMessage.find({ debate: id.toString() });
        return res.status(200).json(messages);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getMessagesOfDebate };