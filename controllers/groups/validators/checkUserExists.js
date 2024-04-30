const User = require("../../../models/users");

const checkUserExists = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User or users not found');
    }
    return user;
};

module.exports = { checkUserExists };