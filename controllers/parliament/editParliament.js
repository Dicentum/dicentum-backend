const Parliament = require("../../models/parliament");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const User = require("../../models/users");
const { checkParliamentExists } = require("./validators/checkParliamentExists");

const updateParliamentDetails = (parliament, details) => {
    if ('name' in details) parliament.name = details.name;
    if('description' in details) parliament.description = details.description;
    if ('location' in details) parliament.location = details.location;
    if ('totalSeats' in details) parliament.totalSeats = details.totalSeats;
    if ('admin' in details) parliament.admin = details.admin;
    if ('parliamentaryGroups' in details) parliament.parliamentaryGroups = details.parliamentaryGroups.split(",");
};

const editParliament = async function (req, res) {
    try {
        const parliament = await checkParliamentExists(req.params.id);
        updateParliamentDetails(parliament, req.body);

        if (parliament.totalSeats < 1) {
            return res.status(400).json({ message: "Total seats must be greater than 0" });
        }
        if(parliament.admin){
            const adminUser = await User.findById(parliament.admin);
            if (!adminUser || adminUser.role !== 'admin') {
                return res.status(400).json({ message: "Admin user not found or not an admin" });
            }
        }

        const parliamentaryGroups = parliament.parliamentaryGroups;
        if (parliamentaryGroups) {
            let totalGroupSeats = 0;
            for (const groupId of parliamentaryGroups) {
                const group = await ParliamentaryGroup.findById(groupId.toString());
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
            if (totalGroupSeats > parliament.totalSeats) {
                return res.status(400).json({ message: "Sum of parliamentary group seats cannot be greater than total seats" });
            }
        }

        const updatedParliament = await parliament.save();
        return res.status(200).json(updatedParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editParliament };