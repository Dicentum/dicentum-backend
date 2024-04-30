const {RP_ID_PASSKEY, ORIGIN} = require("../../utils/config");
const {setCurrentRegistrationOptions, getUserPasskeys} = require("./helpers/dataGetter");
const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');
const Passkey = require("../../models/passkey");

const rpID = RP_ID_PASSKEY;
const rpName = 'Dicentum';
const expectedOrigin = ORIGIN;

const registerKeyStart = async (req, res) => {
    const user = req.user;
    const userPasskeys = await getUserPasskeys(user);
    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName: user.username,
        attestationType: 'none',
        excludeCredentials: userPasskeys.map(passkey => ({
            id: passkey._id.toString(),
            transports: passkey.transports,
        })),
        authenticatorSelection: {
            residentKey: 'required',
            userVerification: 'preferred',
        },
    });
    user.options = options;
    user.save();
    return res.status(200).json(options);
};

const registerKeyFinish = async (req, res) => {
    const user = req.user;
    const body = req.body;

    const currentOptions = user.options;
    let verification;

    try{
        const opts = {
            response: body,
            expectedChallenge: currentOptions.challenge,
            requireUserVerification: true,
            expectedOrigin: expectedOrigin,
            expectedRPID: rpID,
        };
        verification = await verifyRegistrationResponse(opts);
        console.log('Verification: ', verification);
    } catch (error) {
        console.log('Error verifying registration response');
        console.error(error);
        return res.status(400).json({error: error.message});
    }

    const {verified, registrationInfo} = verification;
    const { credentialID, credentialPublicKey, counter, credentialDeviceType, credentialBackedUp } = registrationInfo;
    if (verified){
        const newPasskey = new Passkey({
            credentialID: credentialID,
            webauthnUserId: currentOptions.user.id,
            publicKey: credentialPublicKey,
            counter,
            deviceType: credentialDeviceType,
            backedUp: credentialBackedUp,
            user: user.id,
            transports: body.response.transports
        });
        user.options = null;
        user.passkeys.push(newPasskey);
        await newPasskey.save();
        await user.save();
        return res.status(200).json({verified});
    } else {
        user.options = null;
        user.save();
        console.error('Registration failed');
        return res.status(400).json({error: 'Registration failed'});
    }
};

module.exports = { registerKeyStart, registerKeyFinish };