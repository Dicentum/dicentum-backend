const Passkey = require("../../models/passkey");
const {RP_ID_PASSKEY, ORIGIN} = require("../../utils/config");
const {  verifyAuthenticationResponse } = require('@simplewebauthn/server');
const { getUserPasskey} = require("../auth/helpers/dataGetter");
const {checkDebateExists} = require("../debates/validators/checkDebateExists");
const userVotes = require("../../models/userVotes");
const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const Parliament = require("../../models/parliament");
const fs = require("fs");
const JSEncrypt = require("node-jsencrypt");

const rpID = RP_ID_PASSKEY;
const rpName = 'Dicentum App';
const expectedOrigin = ORIGIN;

const publicKeyFilePath = 'certificates/public_key.pem';

const createSecureVote = async (req, res) => {
    const user = req.user;
    const body = req.body;
    const voteBody = req.decryptedVote;

    const currentOptions = user.options;
    const passkey = await getUserPasskey(user, body.id);
    if (!passkey) {
        return res.status(400).json({error: 'Passkey not found for the user'});
    }

    if(voteBody[0] !== passkey.credentialID){
        return res.status(400).json({error: 'Invalid vote'});
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

        const {verified, authenticationInfo} = verification;
        if(verified){
            passkey.counter = authenticationInfo.newCounter;
            user.options = null;
            await passkey.save();
            await user.save();
            await createVote(user._id, req.params.id, voteBody, res);
        } else {
            user.options = null;
            await user.save();
            return res.status(400).json({error: 'Failed to authenticate'});
        }
    } catch(error) {
        console.error('Error during authentication verification:', error);
        return res.status(500).json({error: error.message});
    }
};

const createVote = async (userId, debateId, body, res) => {
    try{
        const publicKey = fs.readFileSync(publicKeyFilePath, 'utf8');

        if(!body) return res.status(400).json({ message: "Vote not found" });

        const debate = await checkDebateExists(debateId.toString());
        const user = userId;
        const vote = body;

        const thisTime = Date.now();
        if(!debate) return res.status(404).json({ message: "Debate not found" });

        const userRegistered = await User.findById(user);
        const parliamentaryGroup = await ParliamentaryGroup.findById(userRegistered.parliamentaryGroup);
        if(!parliamentaryGroup) return res.status(404).json({ message: "An error occurred E1" });
        const parliament = await Parliament.findById(parliamentaryGroup.parliament);
        if(!parliament) return res.status(404).json({ message: "An error occurred E2" });
        const debates = parliament.debates;
        if(!debates.includes(debate._id)) return res.status(404).json({ message: "An error occurred E3" });

        if(vote[2] !== debate._id.toString()) return res.status(400).json({ message: "Invalid vote" });

        if(debate.isClosed) return res.status(400).json({ message: "Debate is closed" });
        if (thisTime < new Date(debate.startDateVote)) return res.status(400).json({ message: "Voting has not started yet" });
        if (thisTime > new Date(debate.endDateVote)) return res.status(400).json({ message: "Voting has ended" });

        const cleanVote = vote[1]

        let crypt = new JSEncrypt();
        crypt.setPublicKey(publicKey);
        let enc = crypt.encrypt(cleanVote);

        const newVote = new userVotes({
            user,
            vote: enc,
            debate: debate._id
        });
        await newVote.save();
        return res.status(201).json(newVote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = { createSecureVote };