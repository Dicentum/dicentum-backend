const parliamentaryGroup = require('../../models/parliamentaryGroup');
const User = require("../../models/users");

const postParliamentaryGroup = async function (req, res){
    try {
        const name = req.body.name.toString();
        const description = req.body.description.toString();
        const color = req.body.color.toString();
        const logo = req.body.logo.toString();
        const seats = parseInt(req.body.seats);

        const newGroup = new ParliamentaryGroup({
            name,
            description,
            color,
            logo,
            seats
        });

        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliamentaryGroup};