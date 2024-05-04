import DebateTimer from "../../../models/debateTimer";

const checkTimerExists = async function (id) {
    try {
        const timer = await DebateTimer.findById(id);
        if (!timer) {
            throw new Error('Timer not found');
        }
        return timer;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { checkTimerExists };