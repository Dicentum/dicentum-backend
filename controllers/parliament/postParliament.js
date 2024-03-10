const Parliament = require('../../models/parliament');
const User = require("../../models/users");

const postParliament = async function (req, res){
    try {
        const name = req.body.name.toString();
        const location = req.body.location.toString();
        const totalSeats = parseInt(req.body.totalSeats);
        const admin = req.body.admin;
        const parliamentaryGroups = req.body.parliamentaryGroups;

        const adminUser = await User.findById(admin);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(400).json({ message: "Admin user not found or not an admin" });
        }

        const newParliament = new Parliament({
            name,
            location,
            totalSeats,
            admin,
            parliamentaryGroups,
        });

        await newParliament.save();
        return res.status(201).json(newParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliament};