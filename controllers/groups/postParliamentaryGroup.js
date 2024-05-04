const ParliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");
const { checkUserExists } = require("./validators");
const {checkParliamentExists} = require("../parliament/validators/checkParliamentExists");
const Image = require("../../models/image");

const postParliamentaryGroup = async function (req, res){
    try {
        if (req.body.name && req.body.description && req.body.color && req.body.seats && req.body.parliament) {

            const name = req.body.name.toString();
            const description = req.body.description.toString();
            const color = req.body.color.toString();
            let logo = "";

            const seats = parseInt(req.body.seats);
            let users = [];
            if (req.body.users) {
                users = req.body.users;
            }
            const requestedUsers = [];
            const parliament = req.body.parliament;

            if (req.file) {
                if(req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg') {
                    const image = new Image({
                        filename: req.file.filename,
                        path: req.file.path
                    });
                    await image.save();
                    const newGroup = new ParliamentaryGroup({
                        name,
                        description,
                        color,
                        logo: image._id,
                        seats,
                        users,
                        requestedUsers,
                        parliament
                    });
                } else {
                    throw new Error('Invalid file type');
                }
            } else {
                const newGroup = new ParliamentaryGroup({
                    name,
                    description,
                    color,
                    seats,
                    users,
                    requestedUsers,
                    parliament
                });
            }

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
            if(parliamentE.parliamentaryGroups){
                let totalGroupSeats = 0;
                for (const group of parliamentE.parliamentaryGroups) {
                    const groupId = group.toString();
                    const groupExists = await ParliamentaryGroup.findById(groupId);
                    totalGroupSeats += groupExists.seats;
                }
                if (totalGroupSeats + seats > parliamentE.totalSeats) {
                    return res.status(400).json({ message: "Sum of parliamentary group seats cannot be greater than total seats" });
                }
            }
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