const mongoose = require('mongoose');

const checkCast = (req, res, next) => {
    try {
        if (req.params.id === 'undefined' || req.params.id === 'null' || req.params.id === 'false' || req.params.id === 'true' || req.params.id === "") {
            return res.status(400).json({ message: "Invalid ID cast format" });
        }
        next();
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: "Invalid ID format" });
        } else {
            next(error);
        }
    }
};

module.exports = { checkCast };