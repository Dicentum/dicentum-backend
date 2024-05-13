const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const Parliament = require("../../models/parliament");
const userMessage = require("../../models/userMessage");
const {checkDebateExists} = require("../debates/validators/checkDebateExists");

const postMessage = async function (req, res){
    try {
        if(!req.body.content){
            return res.status(400).json({ message: "Content is required" });
        }

        const content = req.body.content.toString();
        const user = req.user;
        const debateId = req.params.id.toString();

        const debate = await checkDebateExists(debateId.toString());

        if(!debate) return res.status(404).json({ message: "Debate not found" });

        if(debate.type === "presential"){
            return res.status(400).json({ message: "This debate type does not allows messages" });
        }

        const userRegistered = await User.findById(user);
        const parliamentaryGroup = await ParliamentaryGroup.findById(userRegistered.parliamentaryGroup);
        if(!parliamentaryGroup) return res.status(404).json({ message: "An error occurred E1" });
        const parliament = await Parliament.findById(parliamentaryGroup.parliament);
        if(!parliament) return res.status(404).json({ message: "An error occurred E2" });
        const debates = parliament.debates;
        if(!debates.includes(debate._id)) return res.status(404).json({ message: "An error occurred E3" });

        if(debate.isClosed) return res.status(400).json({ message: "Debate is already closed" });

        const newMessage = new userMessage({
            content,
            user,
            debate: debate._id
        });
        newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postMessage};