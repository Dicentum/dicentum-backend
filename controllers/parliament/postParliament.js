const Parliament = require('../../models/parliament');
const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const postParliament = async function (req, res){
    try {
        const name = req.body.name.toString();
        const description = req.body.description.toString();
        const location = req.body.location.toString();
        const totalSeats = parseInt(req.body.totalSeats);
        const admin = req.body.admin.toString();

        const adminUser = await User.findById(admin);
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(400).json({ message: "Admin user not found or not an admin" });
        }

        if (totalSeats < 1) {
            return res.status(400).json({ message: "Total seats must be a positive number" });
        }

        const newParliament = new Parliament({
            name,
            description,
            location,
            totalSeats,
            admin,
        });
        adminUser.isAdminOf = newParliament._id;
        adminUser.save();
        await newParliament.save();
        return res.status(201).json(newParliament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {postParliament};