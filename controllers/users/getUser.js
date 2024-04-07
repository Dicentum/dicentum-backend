const User = require("../../models/users");

const getUser = async function (req, res) {
    try{
        const { id } = req.params;
        const user = await User.findById(id.toString());
        return res.status(200).json(user);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { getUser };