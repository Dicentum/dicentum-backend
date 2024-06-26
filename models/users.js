const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const bcryptSalt = process.env.BCRYPT_SALT;
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Please enter your username'
    },
    name: {
        type: String,
        required: 'Please enter your name'
    },
    surname: {
        type: String,
        required: 'Please enter your surname'
    },
    description: {
       type: String,
       default: "No description"
    },
    email: {
        type: String,
        required: 'Please enter your email',
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'EMAIL_IS_NOT_VALID'
        },
        lowercase: true
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    password:{
        type: String,
        trim: true,
        required: 'Please enter your password'
    },
    verification: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    options: {
        type: mongoose.Schema.Types.Mixed
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    passkeys: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Passkey'
    },
    isAdminOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parliament',
    },
    parliamentaryGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParliamentaryGroup'
    },
    parliamentaryGroupRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParliamentaryGroup'
    }

}, { timestamps: true });


// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        user.password = await bcrypt.hash(user.password, Number(bcryptSalt));
        next();
    } catch (error) {
        return next(error);
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('verification') || !user.verification) return next();

    try {
        user.verification = await bcrypt.hash(user.verification, Number(bcryptSalt));
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
userSchema.methods.compareVerificationCode = async function (verificationCode) {
    return bcrypt.compare(verificationCode, this.verification);
};

const User = mongoose.model('User', userSchema);

module.exports = User;