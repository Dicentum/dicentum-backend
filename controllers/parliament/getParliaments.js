const parliament = require('../../models/parliament');

const getParliaments = async function (req, res){
    try {
        const parliaments = await parliament.find({});
        return res.status(200).json(parliaments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {getParliaments};