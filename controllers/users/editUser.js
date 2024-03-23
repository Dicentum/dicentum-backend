const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");

const checkUserExists = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const checkEmailExists = async (email, id) => {
    const existingEmail = await User.findOne({ email: email.toString() });
    if (existingEmail && existingEmail._id.toString() !== id) {
        throw new Error('Email is already taken');
    }
};

const updateUserDetails = (user, details) => {
    if ('email' in details) user.email = details.email;
    if ('description' in details) user.description = details.description;
    if ('role' in details) user.role = details.role;
    if ('phone' in details) user.phone = details.phone;
    if ('city' in details) user.city = details.city;
    if ('country' in details) user.country = details.country;
    if ('photo' in details) user.photo = details.photo;
};

const editUser = async function (req, res) {
    try {
        const user = await checkUserExists(req.params.id);
        await checkEmailExists(req.body.email, req.params.id);
        updateUserDetails(user, req.body);

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editUser };