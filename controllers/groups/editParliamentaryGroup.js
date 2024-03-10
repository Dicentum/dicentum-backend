const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const checkParliamentaryGroupExists = async (id) => {
    const group = await ParliamentaryGroup.findById(id);
    if (!group) {
        throw new Error('Parliamentary group not found');
    }
    return group;
};

const updateParliamentaryGroupDetails = (group, details) => {
    group.name = details.name || group.name;
    group.description = details.description || group.description;
    group.color = details.color || group.color;
    group.logo = details.logo || group.logo;
    group.seats = details.seats || group.seats;
    group.users = details.users || group.users;
};

const editParliamentaryGroup = async function (req, res) {
    try {
        const group = await checkParliamentaryGroupExists(req.params.id);
        updateParliamentaryGroupDetails(group, req.body);

        const updatedGroup = await group.save();
        return res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editParliamentaryGroup };