const Parliament = require('../../models/parliament');
const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const postParliamentaryGroup = async function (req, res){
    try {
        const name = req.body.name.toString();
        const location = req.body.location.toString();
        const totalSeats = parseInt(req.body.totalSeats);
        const admin = req.body.admin;
        const parliamentaryGroups = req.body.parliamentaryGroups;

        const adminUser = await User.findById(admin);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(400).json({ message: "Admin user not found or not an admin" });
        }

        let totalGroupSeats = 0;
        for (let groupId of parliamentaryGroups) {
            const group = await ParliamentaryGroup.findById(groupId);
            if (group) {
                totalGroupSeats += group.seats;
            }
        }
        if (totalSeats !== totalGroupSeats) {
            return res.status(400).json({ message: "Total seats is not equal to the sum of the seats of all the parliamentary groups" });
        }

        const newParliament = new Parliament({
            name,
            location,
            totalSeats,
            admin,
            parliamentaryGroups
        });

        await newParliament.save();
        return res.status(201).json(newParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};