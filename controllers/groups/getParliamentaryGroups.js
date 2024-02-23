const parliamentaryGroup = require('../../models/parliamentaryGroup');

const getParliamentaryGroups = async function (req, res){
    try {
        const parliamentaryGroups = await parliamentaryGroup.find({});
        return res.status(200).json(parliamentaryGroups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {getParliamentaryGroups};
