const parliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");
const Parliament = require("../../models/parliament");

const deleteParliamentaryGroup = async function (req, res){
    try {
        const group = await parliamentaryGroup.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Parliamentary group not found' });
        }
        if(group.users){
            for(let userId of group.users) {
                const existingUser = await User.findById(userId);
                if (existingUser) {
                    existingUser.parliamentaryGroup = null;
                    await existingUser.save();
                }
            }
        }
        const parliaments = await Parliament.find({ parliamentaryGroups: group._id });
        for (let parliament of parliaments) {
            const index = parliament.parliamentaryGroups.indexOf(group._id);
            if (index > -1) {
                parliament.parliamentaryGroups.splice(index, 1);
                await parliament.save();
            }
        }

        await group.remove();
        return res.status(204).json({ message: 'Parliamentary group deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteParliamentaryGroup};