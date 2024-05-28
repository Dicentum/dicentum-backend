const DebateTimer = require('../../models/debateTimer');
const {checkDebateExists} = require("../debates/validators/checkDebateExists");
const {checkUserExists} = require("../groups/validators");

const createTimer = async function (req, res){
    try {
        const content = req.body.content ? req.body.content.toString() : "";
        const start = req.body.start.toString();
        const end = req.body.end.toString();
        const debate = req.body.debate.toString();
        const user = req.body.user.toString();

        const debateExists = await checkDebateExists(debate);
        const userExists = await checkUserExists(user);

        if (!debateExists) {
            return res.status(404).json({ message: "Debate does not exist" });
        }
        if(!userExists){
            return res.status(404).json({ message: "User does not exist" });
        }

        if(debateExists.type == "online"){
            return res.status(400).json({ message: "This debate type does not allows timers" });
        }

        if(end < start){
            return res.status(400).json({ message: "End date must be greater than start date" });
        }
        if(start < new Date()){
            return res.status(400).json({ message: "Start date must be equal or greater than current date" });
        }

        if(debateExists.isClosed){
            return res.status(400).json({ message: "Debate is closed" });
        }

        const newTimer = new DebateTimer({
            content,
            start,
            end,
            debate,
            user: userExists._id
        });

        await newTimer.save();
        debateExists.timers.push(newTimer._id);
        debateExists.save();
        res.status(201).json(newTimer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {createTimer};