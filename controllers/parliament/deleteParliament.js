const Parliament = require('../../models/parliament');

const deleteParliament = async function (req, res){
    try {
        const parliament = await Parliament.findById(req.params.id);
        if (!parliament) {
            return res.status(404).json({ message: 'Parliament not found' });
        }
        await parliament.remove();
        return res.status(204).json({ message: 'Parliament deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteParliament};