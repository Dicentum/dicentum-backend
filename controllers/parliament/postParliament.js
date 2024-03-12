const Parliament = require('../../models/parliament');
const User = require("../../models/users");
const { ParliamentaryGroup } = require("../../models/parliamentaryGroup");

const postParliament = async function (req, res){
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

        if (totalSeats < 1) {
            return res.status(400).json({ message: "Total seats must be a positive number" });
        }

        const newParliament = new Parliament({
            name,
            location,
            totalSeats,
            admin,
            parliamentaryGroups,
        });

        if(parliamentaryGroups){
            let totalGroupSeats = 0;
            for (const group of parliamentaryGroups) {
                const groupExists = await ParliamentaryGroup.findById(group);
                if (groupExists.parliament){
                    return res.status(400).json({ message: "Parliamentary group already in a parliament" });
                } else {
                    groupExists.parliament = newParliament._id;
                    await groupExists.save();
                }
                totalGroupSeats += groupExists.seats;
            }
            if (totalGroupSeats > totalSeats) {
                return res.status(400).json({ message: "Sum of parliamentary group seats cannot be greater than total seats" });
            }
        }

        await newParliament.save();
        return res.status(201).json(newParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliament};