const jwt = require('jsonwebtoken');
const User = require('../../models/users');

// Login with an existing user
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });
        res.json({
            message: 'Authentication successful',
            token: token,
            expiration: token.expiresIn
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { login };