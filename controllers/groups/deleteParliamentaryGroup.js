const parliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");

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
        await group.remove();
        return res.status(204).json({ message: 'Parliamentary group deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteParliamentaryGroup};