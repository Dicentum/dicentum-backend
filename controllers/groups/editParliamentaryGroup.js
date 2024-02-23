const parliamentaryGroup = require('../../models/parliamentaryGroup');

const putParliamentaryGroup = async function (req, res){
    try {
        const group = await parliamentaryGroup.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Parliamentary group not found' });
        }
        Object.assign(group, req.body);
        const updatedGroup = await group.save();
        return res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {putParliamentaryGroup};