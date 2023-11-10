const jwt = require('jsonwebtoken');
const User = require('../../models/users');

// Register a new user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if required fields are missing
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    //Check if the email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
    }

    //Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email is already taken' });
    }

    try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username: username, email: email, password: password });
        await user.save();
        res.json({ message: 'Registration successful' })
    } catch (error) {
        next(error);
    }
};

module.exports = { register };