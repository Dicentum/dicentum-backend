const {RP_ID_PASSKEY, ORIGIN} = require("../../utils/config");
const Challenge = require("../../models/challenges");
const SimpleWebAuthnServer = require("@simplewebauthn/server");
const {getRegistrationInfo, getNewChallenge, convertChallenge} = require("./helpers/dataGetter");

const rpId = RP_ID_PASSKEY;
const origin = ORIGIN;

const registerKeyStart = async (req, res) => {
    const user = req.user;
    let challenge = getNewChallenge();

    const existingChallenge = await Challenge.findOne({ email: user.email });

    if (existingChallenge) {
        res.status(400).json({ message: "There is already a PassKey for this user" });
    } else {
        const newChallenge = new Challenge({
            challenge: convertChallenge(challenge),
            email: user.email
        });
        await newChallenge.save();
    }

    const pubKey = {
        challenge: challenge,
        rp: {id: rpId, name: 'dicentum'},
        user: {id: user._id, name: user.username, displayName: user.email},
        pubKeyCredParams: [
            {type: 'public-key', alg: -7},
            {type: 'public-key', alg: -257}
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
            residentKey: 'preferred',
            requireResidentKey: false,
        }
    };
    res.json(pubKey);
};

const registerKeyFinish = async (req, res) => {
    const user = req.user;
    let verification;
    const expectedChallenge = await Challenge.findOne({email: user.email});
    try {
        verification = await SimpleWebAuthnServer.verifyRegistrationResponse({
            response: req.body.data,
            expectedChallenge: expectedChallenge.challenge,
            expectedOrigin: origin,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
    const {verified, registrationInfo} = verification;
    if (verified){
        const {credentialPublicKey, counter, credentialID} = getRegistrationInfo(registrationInfo);
        user.credentialPublicKey = credentialPublicKey;
        user.credentialId = credentialID;
        user.counter = counter;
        await user.save();
        return res.status(200).json({message: 'Key registered successfully'});
    }
    return res.status(400).json({message: 'Key registration failed'});
};

module.exports = { registerKeyStart, registerKeyFinish };