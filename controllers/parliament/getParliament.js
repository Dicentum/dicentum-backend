const parliament = require('../../models/parliament');

const getParliament = async function (req, res){
    try {
        if (req.params.id === 'undefined') {
            return res.status(404).json({ message: 'Parliament does not exist' });
        }
        const gParliament = await parliament.findById(req.params.id);
        if (!gParliament) {
            return res.status(404).json({ message: 'Parliament not found' });
        }
        return res.status(200).json(gParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {getParliament};