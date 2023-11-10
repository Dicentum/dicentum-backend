const User = require("../../models/users");

const getUsers = async function (req, res, next) {
    try{
        const users = await User.find({});
        return res.status(200).json(users);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getUsers };