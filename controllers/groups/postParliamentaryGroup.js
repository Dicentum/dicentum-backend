const ParliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");
const { checkUserExists } = require("./validators");

const postParliamentaryGroup = async function (req, res){
    try {
        const name = req.body.name.toString();
        const description = req.body.description.toString();
        const color = req.body.color.toString();
        const logo = req.body.logo.toString();
        const seats = parseInt(req.body.seats);
        const users = req.body.users;
        const requestedUsers = req.body.requestedUsers;

        const newGroup = new ParliamentaryGroup({
            name,
            description,
            color,
            logo,
            seats,
            users,
            requestedUsers
        });

        if (seats < 1) {
            return res.status(400).json({ message: "Seats must be a positive number" });
        }
        if(users && users.length > seats) {
            return res.status(400).json({ message: "Number of users cannot be greater than the number of seats" });
        }
        if(users && requestedUsers){
            for (const user of users) {
                if(requestedUsers.includes(user)){
                    return res.status(400).json({ message: "A user cannot be both in users and requestedUsers" });
                }
                const userExists = await checkUserExists(user);
                const userGroup = userExists.parliamentaryGroup;
                if (userGroup) {
                    return res.status(400).json({ message: "User already in a parliamentary group" });
                } else {
                    userExists.parliamentaryGroup = newGroup._id;
                    await userExists.save();
                }
            }
            for (const user of requestedUsers) {
                const userExists = await checkUserExists(user);
                const userGroupRequest = userExists.parliamentaryGroupRequest;
                if (userGroupRequest) {
                    return res.status(400).json({ message: "User already requested to join another group" });
                } else {
                    userExists.parliamentaryGroupRequest = newGroup._id;
                    await userExists.save();
                }
            }
        }

        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};