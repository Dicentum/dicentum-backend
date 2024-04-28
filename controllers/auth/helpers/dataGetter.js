const User = require('../../../models/users');
const Passkey = require("../../../models/passkey");

const getUserPasskeys = async (user) => {
    const passkeys = await Passkey.find({ user: user._id });
    if(!passkeys){
       return [];
    } else {
        return passkeys;
    }
};
const getUserPasskey = async (user, passkeyId) => {
    try {
        const passkey = await Passkey.findOne({user: user.id, credentialID: passkeyId});
        return passkey;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

module.exports = { getUserPasskeys, getUserPasskey };