const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const {checkParliamentaryGroupExists, checkUserExists} = require("./validators");

const updateParliamentaryGroupDetails = (group, details) => {
    group.name = details.name || group.name;
    group.description = details.description || group.description;
    group.color = details.color || group.color;
    group.logo = details.logo || group.logo;
    group.seats = details.seats || group.seats;
    group.users = details.users || group.users;
    group.requestedUsers = details.requestedUsers || group.requestedUsers;
};

const editParliamentaryGroup = async function (req, res) {
    try {
        const group = await checkParliamentaryGroupExists(req.params.id);
        const oldUsers = [...group.users];
        const oldRequestedUsers = [...group.requestedUsers];

        group.set(req.body);

        if(req.body.users && req.body.users.length > group.seats) {
            return res.status(400).json({ message: "Number of users cannot be greater than the number of seats" });
        }

        if(req.body.users && req.body.requestedUsers){
            for (const user of req.body.users) {
                if(req.body.requestedUsers.includes(user)){
                    return res.status(400).json({ message: "A user cannot be both in users and requestedUsers" });
                }
                const userExists = await checkUserExists(user);
                const userGroup = userExists.parliamentaryGroup;
                if (userGroup && userGroup.toString() !== group._id.toString()) {
                    return res.status(400).json({ message: "User already in a parliamentary group" });
                } else {
                    userExists.parliamentaryGroup = group._id;
                    await userExists.save();
                }
            }
            for (const user of req.body.requestedUsers) {
                const userExists = await checkUserExists(user);
                const userGroupRequest = userExists.parliamentaryGroupRequest;
                if (userGroupRequest && userGroupRequest.toString() !== group._id.toString()) {
                    return res.status(400).json({ message: "User already requested to join another group" });
                } else {
                    userExists.parliamentaryGroupRequest = group._id;
                    await userExists.save();
                }
            }
        }
        // Handle removed users
        const removedUsers = oldUsers.filter(user => !req.body.users.includes(user));
        for (const userId of removedUsers) {
            const user = await checkUserExists(userId);
            user.parliamentaryGroup = null;
            await user.save();
        }

        // Handle removed requested users
        const removedRequestedUsers = oldRequestedUsers.filter(user => !req.body.requestedUsers.includes(user));
        for (const userId of removedRequestedUsers) {
            const user = await checkUserExists(userId);
            user.parliamentaryGroupRequest = null;
            await user.save();
        }

        const updatedGroup = await group.save();
        return res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editParliamentaryGroup };