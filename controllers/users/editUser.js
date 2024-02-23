const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup")

const editUser = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail && existingEmail._id.toString() !== req.params.id) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        if (req.body.parliamentaryGroup) {
            const newGroup = await ParliamentaryGroup.findById(req.body.parliamentaryGroup);
            if (!newGroup) {
                return res.status(404).json({ message: 'Parliamentary group not found' });
            }
            user.parliamentaryGroup = newGroup._id;
        }

        user.email = req.body.email || user.email;
        user.description = req.body.description || user.description;
        user.role = req.body.role || user.role;
        user.phone = req.body.phone || user.phone;
        user.city = req.body.city || user.city;
        user.country = req.body.country || user.country;
        user.photo = req.body.photo || user.photo;

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editUser };