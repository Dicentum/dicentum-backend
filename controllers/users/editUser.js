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

const updateParliamentaryGroup = async (user, parliamentaryGroupId) => {
    if (parliamentaryGroupId) {
        const newGroup = await ParliamentaryGroup.findById(parliamentaryGroupId);
        if (!newGroup) {
            throw new Error('Parliamentary group not found');
        }
        user.parliamentaryGroup = newGroup._id;
    }
};

const updateUserDetails = (user, details) => {
    user.email = details.email || user.email;
    user.description = details.description || user.description;
    user.role = details.role || user.role;
    user.phone = details.phone || user.phone;
    user.city = details.city || user.city;
    user.country = details.country || user.country;
    user.photo = details.photo || user.photo;
};

const editUser = async function (req, res) {
    try {
        const user = await checkUserExists(req.params.id);
        await checkEmailExists(req.body.email, req.params.id);
        await updateParliamentaryGroup(user, req.body.parliamentaryGroup);
        updateUserDetails(user, req.body);

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editUser };