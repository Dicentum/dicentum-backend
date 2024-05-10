const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const {checkParliamentaryGroupExists, checkUserExists} = require("./validators");
const Image = require("../../models/image");

const updateParliamentaryGroupDetails = async (group, details, file) => {
    if ('name' in details) group.name = details.name;
    if ('description' in details) group.description = details.description;
    if ('color' in details) group.color = details.color;
    if ('seats' in details) group.seats = details.seats;
    if ('users' in details && details.users !== ""){
        if(typeof details.users === 'string') {
            details.users = details.users.split(',').map(id => id.trim());
        }
        group.users = details.users;
    }
    if ('requestedUsers' in details && details.requestedUsers !== ""){
        if(typeof details.requestedUsers === 'string') {
            details.requestedUsers = details.requestedUsers.split(',').map(id => id.trim());
        }
        group.requestedUsers = details.requestedUsers;
    }

    if (file) {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            const image = new Image({
                filename: file.filename,
                path: file.path
            });
            console.log("IMAGE", image);
            await image.save();
            group.logo = image._id;
            console.log("GROUP", group);
        } else {
            throw new Error('Invalid file type');
        }
    }
};

const editParliamentaryGroup = async function (req, res) {
    try {
        const group = await checkParliamentaryGroupExists(req.params.id);
        const oldUsers = [...group.users];
        const oldRequestedUsers = [...group.requestedUsers];

        console.log(req.body);
        console.log(req.file);
        await updateParliamentaryGroupDetails(group, req.body, req.file);

        if(Array.isArray(group.users) && group.users.length > group.seats) {
            return res.status(400).json({ message: "Number of users cannot be greater than the number of seats" });
        }

        if (Array.isArray(group.users)) {
            req.body.users = [...new Set(req.body.users)];
        }

        if(Array.isArray(group.users) && Array.isArray(group.requestedUsers)){
            for (const user of group.users) {
                if(group.requestedUsers.includes(user)){
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
            for (const user of group.requestedUsers) {
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
        const removedUsers = oldUsers.filter(user => !group.users.includes(user));
        for (const userId of removedUsers) {
            const user = await checkUserExists(userId);
            user.parliamentaryGroup = null;
            await user.save();
        }

        // Handle removed requested users
        const removedRequestedUsers = oldRequestedUsers.filter(user => !group.requestedUsers.includes(user));
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