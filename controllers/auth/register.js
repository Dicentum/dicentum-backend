const User = require('../../models/users');
const validatePassword = require('./validators/passwordValidator');
const createUniqueUsername = require("./validators/createUniqueUsername");
const generateVerificationCode = require("./validators/generateVerificationCode");
const { sendEmail, welcomeSubject, welcomeText } = require('../emailer/index');

const register = async (req, res, next) => {
    try {
        if (req.body.password === undefined || req.body.name === undefined || req.body.surname === undefined || req.body.email === undefined) {
            return res.status(400).json({ message: 'E1 Name, surname, email, and password are required' });
        }

        const password = req.body.password.toString();
        const name = req.body.name.toString();
        const surname = req.body.surname.toString();
        const email = req.body.email.toString();

        if (!email || !password || !name || !surname) {
            return res.status(400).json({ message: 'E2 Name, surname, email, and password are required' });
        }

        if (name.length < 3 || surname.length < 3) {
            return res.status(400).json({ message: 'Name and surname must be at least 3 characters long' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password does not meet the policy requirements' });
        }

        const username = await createUniqueUsername(name, surname);
        const verification = generateVerificationCode().toString();

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const user = new User({ username: username, name: name, surname:surname, email: email, password: password, verification: verification });
        await sendEmail(email, welcomeSubject, welcomeText(user.name, user.username, user._id, user.verification));
        await user.save();
        res.json({ message: 'Registration successful' , id: user._id})
    } catch (error) {
        next(error);
    }
};

module.exports = { register };