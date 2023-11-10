const checkUserOwnership = (req, res, next) => {
    // Check if the authenticated user's ID matches the requested user's ID
    if (req.user && req.params.id === req.user._id.toString()) {
        // The user is authorized to access their own information
        next();
    } else {
        // User is not authorized to access someone else's information
        res.status(403).json({ message: 'Access denied' });
    }
};

module.exports = { checkUserOwnership };