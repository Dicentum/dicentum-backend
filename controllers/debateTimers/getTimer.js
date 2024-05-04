const debateTimer = require('../../models/debateTimer');
const {checkTimerExists} = require("./validators/checkTimerExists");

const getTimer = async function (req, res){
    try {
        const timer = await checkTimerExists(req.params.id);
        if (!timer) {
            return res.status(404).json({ message: 'Timer not found' });
        }
        return res.status(200).json(timer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {getTimer};