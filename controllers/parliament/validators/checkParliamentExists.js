const Parliament = require("../../../models/parliament");
const checkParliamentExists = async (id) => {
    const parliament = await Parliament.findById(id);
    if (!parliament) {
        throw new Error('Parliament not found');
    }
    return parliament;
};

module.exports = { checkParliamentExists };