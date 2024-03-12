const Parliament = require("../../models/parliament");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const User = require("../../models/users");
const { checkParliamentExists } = require("./validators/checkParliamentExists");

const updateParliamentDetails = (parliament, details) => {
    parliament.name = details.name || parliament.name;
    parliament.location = details.location || parliament.location;
    parliament.totalSeats = details.totalSeats || parliament.totalSeats;
    parliament.admin = details.admin || parliament.admin;
    parliament.parliamentaryGroups = details.parliamentaryGroups || parliament.parliamentaryGroups;
};

const editParliament = async function (req, res) {
    try {
        const parliament = await checkParliamentExists(req.params.id);

        if (req.body.totalSeats < 1) {
            return res.status(400).json({ message: "Total seats must be greater than 0" });
        }
        if(req.body.admin){
            const adminUser = await User.findById(req.body.admin);
            if (!adminUser || adminUser.role !== 'admin') {
                return res.status(400).json({ message: "Admin user not found or not an admin" });
            }
        }

        const parliamentaryGroups = req.body.parliamentaryGroups;
        if (parliamentaryGroups) {
            let totalGroupSeats = 0;
            for (const groupId of parliamentaryGroups) {
                const group = await ParliamentaryGroup.findById(groupId);
                if (!group) {
                    return res.status(400).json({ message: "Parliamentary group not found" });
                }
                if (group.parliament && group.parliament.toString() !== parliament._id.toString()) {
                    return res.status(400).json({ message: "Parliamentary group already in a parliament" });
                }
                group.parliament = parliament._id;
                await group.save();
                totalGroupSeats += group.seats;
            }
            if (totalGroupSeats > req.body.totalSeats) {
                return res.status(400).json({ message: "Sum of parliamentary group seats cannot be greater than total seats" });
            }
        }

        updateParliamentDetails(parliament, req.body);

        const updatedParliament = await parliament.save();
        return res.status(200).json(updatedParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editParliament };