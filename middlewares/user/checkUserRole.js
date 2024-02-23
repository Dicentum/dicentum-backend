const User = require('../../models/users');

const checkUserRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (!user || user.role !== role) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Error: "+error });
        }
    };
};

module.exports = { checkUserRole };