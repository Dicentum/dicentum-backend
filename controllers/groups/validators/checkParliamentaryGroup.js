const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const checkParliamentaryGroupExists = async (id) => {
    const group = await ParliamentaryGroup.findById(id);
    if (!group) {
        throw new Error('Parliamentary group not found');
    }
    return group;
};

module.exports = { checkParliamentaryGroupExists };