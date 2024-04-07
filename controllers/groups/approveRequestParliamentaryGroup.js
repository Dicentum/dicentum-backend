const {checkParliamentaryGroupExists, checkUserExists} = require("./validators");

const approveRequestParliamentaryGroup = async (req, res) => {
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

        if (!group.requestedUsers.includes(userId) || user.parliamentaryGroupRequest !== group._id.toString()) {
            return res.status(400).json({message: "User has not requested to join this group"});
        }

        group.requestedUsers = group.requestedUsers.filter(requestedUserId => requestedUserId !== userId);

        user.parliamentaryGroup = group._id;
        delete user.parliamentaryGroupRequest;

        await group.save();
        await user.save();

        return res.status(200).json({message: "User has been added to the group successfully"});


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = { approveRequestParliamentaryGroup };