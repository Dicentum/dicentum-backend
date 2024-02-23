const User = require('../../models/users');

// Register a new user
const register = async (req, res, next) => {
    const { username, name, surname,  email, password } = req.body;

    if (!username || !email || !password || !name || !surname) {
        return res.status(400).json({ message: 'Username, name, email, and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email is already taken' });
    }

    try {
        const user = new User({ username: username, name: name, surname:surname, email: email, password: password });
        await user.save();
        res.json({ message: 'Registration successful' })
    } catch (error) {
        next(error);
    }
};

module.exports = { register };