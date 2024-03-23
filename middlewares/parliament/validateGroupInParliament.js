const Parliament = require("../../models/parliament");

const validateGroupInParliament = async (req, res, next) => {
    try {
        const parliamentaryGroups = req.body.parliamentaryGroups;

        for (let groupId of parliamentaryGroups) {
            const existingParliament = await Parliament.findOne({ parliamentaryGroups: groupId });
            if (existingParliament) {
                return res.status(400).json({ message: 'Parliamentary group is already part of another parliament' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Error in validations: "+error});
    }

    next();
}

module.exports = { validateGroupInParliament };