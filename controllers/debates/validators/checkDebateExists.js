const Debate = require("../../../models/debate");

const checkDebateExists = async (id) => {
    const debate = await Debate.findById(id);
    if (!debate) {
        throw new Error('Debate not found');
    }
    return debate;
}

module.exports = { checkDebateExists };