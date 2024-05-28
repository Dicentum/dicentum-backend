const DebateTimer = require('../../../models/debateTimer');

const checkTimerExists = async function (id) {
    try {
        const timer = await DebateTimer.findById(id);
        if (!timer) {
            return null;
        }
        return timer;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { checkTimerExists };