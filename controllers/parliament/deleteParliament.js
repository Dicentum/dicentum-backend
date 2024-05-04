const Parliament = require('../../models/parliament');
const ParliamentaryGroup = require('../../models/parliamentaryGroup');
const parliamentaryGroup = require("../../models/parliamentaryGroup");

const deleteParliament = async function (req, res){
    try {
        const parliament = await Parliament.findById(req.params.id);
        if (!parliament) {
            return res.status(404).json({ message: 'Parliament not found' });
        }

        const groups = await ParliamentaryGroup.find({ parliament: parliament._id });
        for (let group of groups) {
            group.parliament = null;
            await group.save();
        }

        await parliament.deleteOne({ _id: parliament._id });
        return res.status(204).json({ message: 'Parliament deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteParliament};