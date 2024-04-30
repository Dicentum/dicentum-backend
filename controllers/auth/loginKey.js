const Passkey = require("../../models/passkey");
const {RP_ID_PASSKEY, ORIGIN} = require("../../utils/config");
const { generateAuthenticationOptions, verifyAuthenticationResponse } = require('@simplewebauthn/server');
const {getUserPasskeys, getUserPasskey} = require("./helpers/dataGetter");

const rpID = RP_ID_PASSKEY;
const rpName = 'Dicentum App';
const expectedOrigin = 'http://localhost:5173';

const loginKeyStart = async (req, res) => {
    const user = req.user;
    const userPasskeys = await getUserPasskeys(user);

    const options = await generateAuthenticationOptions({
        rpID,
        userVerification: 'preferred',
        allowCredentials: userPasskeys.map(passkey => ({
            id: passkey.credentialID,
            transports: passkey.transports,
        })),
    });
    user.options = options;
    user.save();
    return res.status(200).json(options);
};

const loginKeyFinish = async (req, res) => {
    const user = req.user;
    const body = req.body;

  const currentOptions = user.options;
    const passkey = await getUserPasskey(user, body.id);
    if (!passkey) {
        return res.status(400).json({error: 'Passkey not found for the user'});
    }
    let verification;

    const publicKeyBuffer = Buffer.from(passkey.publicKey.read(0, passkey.publicKey.length()));
    const publicKeyUint8Array = new Uint8Array(publicKeyBuffer);

    try{
        const options = {
            response: body,
            expectedChallenge: currentOptions.challenge,
            expectedOrigin: expectedOrigin,
            expectedRPID: rpID,
            requireUserVerification: true,
            authenticator: {
                credentialID: passkey.credentialID,
                credentialPublicKey: publicKeyUint8Array,
                counter: passkey.counter,
                transports: passkey.transports,
            },
        };
        verification = await verifyAuthenticationResponse(options);
        console.log("VERIFICATION");
        console.log(verification); // Add this line

        const {verified, authenticationInfo} = verification;
        if(verified){
            passkey.counter = authenticationInfo.newCounter;
            user.options = null;
            await passkey.save();
            await user.save();
            return res.status(200).json({message: 'Successfully authenticated'});
        }
        return res.status(400).json({error: 'Failed to authenticate'});

    } catch(error) {
        console.error('Error during authentication verification:', error);
        return res.status(500).json({error: error.message});
    }
};

module.exports = { loginKeyStart, loginKeyFinish };