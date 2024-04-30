const {checkParliamentaryGroupExists, checkUserExists} = require("./validators");

const requestParliamentaryGroup = async function (req, res){
    try {
        let id = "";
        let userId = "";
        if ('id' in req.params) id = req.params.id.toString();
        if ('user' in req.body) userId = req.body.user.toString();

        if(id === "" || userId === "") {
            return res.status(400).json({message: "Both group ID and user ID must be provided"});
        }

        const group = await checkParliamentaryGroupExists(id);
        if (!group) {
            return res.status(404).json({message: "Parliamentary group not found"});
        }

        const user = await checkUserExists(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (user.parliamentaryGroupRequest) {
            return res.status(400).json({message: "User already requested to join another group"});
        }

        if (group.users.includes(userId)) {
            return res.status(400).json({message: "User is in another parliamentary group"});
        }
        if (user.parliamentaryGroup) {
            return res.status(400).json({message: "User already in a parliamentary group"});
        }

        if (group.requestedUsers.includes(userId) || user.parliamentaryGroupRequest === group._id.toString()) {
            return res.status(400).json({message: "User already requested to join this group"});
        }

        group.requestedUsers.push(userId);
        user.parliamentaryGroupRequest = group._id;

        await group.save();
        await user.save();

        return res.status(200).json({message: "Request sent successfully"});

    } catch (error) {
        if (error.name === 'MongoError') {
            res.status(500).json({ message: "Database Error: "+error });
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal Error: "+error });
        }
    }
}

module.exports = { requestParliamentaryGroup };