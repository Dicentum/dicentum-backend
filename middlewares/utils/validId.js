const mongoose = require('mongoose');

const validId = (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports = { validId };