const Debate = require('../../models/debate');
const {checkDebateExists} = require("./validators/checkDebateExists");
const parliamentaryGroup = require("../../models/parliamentaryGroup");

const deleteDebate = async function (req, res){
    try {
        const debate = await checkDebateExists(req.params.id);
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        await debate.deleteOne({ _id: debate._id });
        return res.status(204).json({ message: 'Debate deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteDebate};