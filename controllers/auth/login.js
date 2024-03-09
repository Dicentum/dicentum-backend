const jwt = require('jsonwebtoken');
const User = require('../../models/users');

// Login with an existing user
const login = async (req, res, next) => {
    const username = req.body.username.toString();
    const password = req.body.password.toString();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const expiresIn = '1 hour';
        const expiration = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour from now
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: expiresIn
        });

        res.json({
            message: 'Authentication successful',
            username: username,
            token: token,
            expiration: expiration
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { login };