const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const validateTotalSeats = async (req, res, next) => {
    try {
        const totalSeats = parseInt(req.body.totalSeats);
        if(totalSeats !== undefined && req.body.parliamentaryGroups !== undefined) {
            const parliamentaryGroups = req.body.parliamentaryGroups.split(',');
            let totalGroupSeats = 0;
            for (let groupId of parliamentaryGroups) {
                const group = await ParliamentaryGroup.findById(groupId.toString());
                if (group) {
                    totalGroupSeats += group.seats;
                }
            }
            if (totalSeats !== totalGroupSeats) {
                return res.status(400).json({message: "Total seats is not equal to the sum of the seats of all the parliamentary groups"});
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Error in validations: "+error});
    }

    next();
}

module.exports = { validateTotalSeats };