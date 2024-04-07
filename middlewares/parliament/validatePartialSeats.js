const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const validatePartialSeats = async (req, res, next) => {
    try {
        if(req.body.parliamentaryGroups) {
            const totalSeats = parseInt(req.body.totalSeats);
            let parliamentaryGroups;

            if (typeof req.body.parliamentaryGroups === 'string') {
                parliamentaryGroups = req.body.parliamentaryGroups.split(',');
            } else if (Array.isArray(req.body.parliamentaryGroups)) {
                parliamentaryGroups = req.body.parliamentaryGroups;
            } else {
                return res.status(400).json({message: "parliamentaryGroups must be a string or an array"});
            }

            let totalGroupSeats = 0;
            for (let groupId of parliamentaryGroups) {
                const group = await ParliamentaryGroup.findById(groupId.toString());
                if (group) {
                    totalGroupSeats += group.seats;
                }
            }
            if (totalSeats < totalGroupSeats) {
                return res.status(400).json({message: "Total seats must be greater or equal to the sum of the seats of all the parliamentary groups"});
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Error in validations: "+error});
    }

    next();
}

module.exports = { validatePartialSeats };