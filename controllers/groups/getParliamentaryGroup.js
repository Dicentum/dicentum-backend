const parliamentaryGroup = require('../../models/parliamentaryGroup');

const getParliamentaryGroup = async function (req, res){
    try {
        if (req.params.id === 'undefined') {
            return res.status(404).json({ message: 'Parliamentary group does not exist' });
        }
        const group = await parliamentaryGroup.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Parliamentary group not found' });
        }
        return res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {getParliamentaryGroup};