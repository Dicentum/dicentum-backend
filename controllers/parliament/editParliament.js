const Parliament = require("../../models/parliament");

const checkParliamentExists = async (id) => {
    const parliament = await Parliament.findById(id);
    if (!parliament) {
        throw new Error('Parliament not found');
    }
    return parliament;
};

const updateParliamentDetails = (parliament, details) => {
    parliament.name = details.name || parliament.name;
    parliament.location = details.location || parliament.location;
    parliament.totalSeats = details.totalSeats || parliament.totalSeats;
    parliament.admin = details.admin || parliament.admin;
    parliament.parliamentaryGroups = details.parliamentaryGroups || parliament.parliamentaryGroups;
};

const editParliament = async function (req, res) {
    try {
        const parliament = await checkParliamentExists(req.params.id);
        updateParliamentDetails(parliament, req.body);

        const updatedParliament = await parliament.save();
        return res.status(200).json(updatedParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editParliament };