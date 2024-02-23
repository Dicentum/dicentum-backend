const parliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");

const postParliamentaryGroup = async function (req, res){
    try {
        const newGroup = new parliamentaryGroup(req.body);
        if(req.body.users){
            for(let userId of req.body.users) {
                const existingUser = await User.findById(userId);
                if (existingUser && existingUser.parliamentaryGroup) {
                    return res.status(400).json({message: "This user already has a group assigned"});
                } else if (existingUser) {
                    existingUser.parliamentaryGroup = newGroup._id;
                    await existingUser.save();
                }
            }
        }
        const savedGroup = await newGroup.save();
        return res.status(200).json(savedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};