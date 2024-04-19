const ParliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");
const { checkUserExists } = require("./validators");
const {checkParliamentExists} = require("../parliament/validators/checkParliamentExists");

const postParliamentaryGroup = async function (req, res){
    try {
        console.log(req);
        if (req.body.name && req.body.description && req.body.color && req.body.seats && req.body.parliament) {

            const name = req.body.name.toString();
            const description = req.body.description.toString();
            const color = req.body.color.toString();
            let logo = "";
            if (req.body.logo) {
                logo = req.body.logo.toString();
            }
            const seats = parseInt(req.body.seats);
            let users = [];
            if (req.body.users) {
                users = req.body.users;
            }
            const requestedUsers = [];
            const parliament = req.body.parliament;

            const newGroup = new ParliamentaryGroup({
                name,
                description,
                color,
                logo,
                seats,
                users,
                requestedUsers,
                parliament
            });

            if (seats < 1) {
                return res.status(400).json({message: "Seats must be a positive number"});
            }
            if (users && users.length > seats) {
                return res.status(400).json({message: "Number of users cannot be greater than the number of seats"});
            }
            if (users && requestedUsers) {
                for (const user of users) {
                    if (requestedUsers.includes(user)) {
                        return res.status(400).json({message: "A user cannot be both in users and requestedUsers"});
                    }
                    const userExists = await checkUserExists(user);
                    const userGroup = userExists.parliamentaryGroup;
                    if (userGroup) {
                        return res.status(400).json({message: "User already in a parliamentary group"});
                    } else {
                        userExists.parliamentaryGroup = newGroup._id;
                        await userExists.save();
                    }
                }
                for (const user of requestedUsers) {
                    const userExists = await checkUserExists(user);
                    const userGroupRequest = userExists.parliamentaryGroupRequest;
                    if (userGroupRequest) {
                        return res.status(400).json({message: "User already requested to join another group"});
                    } else {
                        userExists.parliamentaryGroupRequest = newGroup._id;
                        await userExists.save();
                    }
                }
            }
            const parliamentE = await checkParliamentExists(parliament);
            parliamentE.parliamentaryGroups.push(newGroup._id);

            await newGroup.save();
            await parliamentE.save();
            res.status(201).json(newGroup);
        } else {
            res.status(400).json({message: "Missing parameters"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};