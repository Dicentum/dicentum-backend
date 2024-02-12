const parliamentaryGroup = require('../../models/parliamentaryGroup');

const postParliamentaryGroup = async function (req, res){
    try {
        const newGroup = new parliamentaryGroup(req.body);
        const savedGroup = await newGroup.save();
        return res.status(200).json(savedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};