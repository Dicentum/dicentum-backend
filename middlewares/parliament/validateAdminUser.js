const User = require("../../models/users");

const validateAdminUser = async (req, res, next) => {
    try {
        const admin = req.body.admin;
        if (admin !== undefined && admin !== null && admin !== "") {
            const adminUser = await User.findById(admin.toString());
            if (!adminUser || adminUser.role !== 'admin') {
                return res.status(400).json({message: "Admin user privileges not found or not an admin"});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error in validations: "+error });
    }

    next();
}

module.exports = { validateAdminUser };