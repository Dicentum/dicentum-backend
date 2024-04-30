const {checkParliamentaryGroupExists, checkUserExists} = require("./validators");

const deleteRequestParliamentaryGroup = async function (req, res){
    try {
        let id = "";
        let userId = "";
        if ('id' in req.params) id = req.params.id.toString();
        if ('user' in req.params) userId = req.params.user.toString();

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

        if (group.users.includes(userId)) {
            return res.status(400).json({message: "User is in parliamentary group"});
        }
        if (user.parliamentaryGroup) {
            return res.status(400).json({message: "User already in a parliamentary group"});
        }

        if (group.requestedUsers.includes(userId) || user.parliamentaryGroupRequest === group._id.toString()) {
            group.requestedUsers = group.requestedUsers.filter(user => user.toString() !== userId);
            user.parliamentaryGroupRequest = null;
            await group.save();
            await user.save();
        }

        return res.status(204).json({message: "Request deleted successfully"});

    } catch (error) {
        if (error.name === 'MongoError') {
            res.status(500).json({ message: "Database Error: "+error });
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal Error: "+error });
        }
    }
}

module.exports = { deleteRequestParliamentaryGroup };