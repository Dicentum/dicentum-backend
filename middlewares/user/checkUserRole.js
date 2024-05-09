const User = require('../../models/users');
const jwt = require("jsonwebtoken");

const checkUserRole = (role) => {
    return async (req, res, next) => {
        const token = req.headers["authorization"];
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decodedToken.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.role !== role) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Error: "+error });
        }
    };
};

module.exports = { checkUserRole };