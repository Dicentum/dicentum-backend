const mongoose = require("mongoose");
const { AuthenticatorTransportFuture,
    CredentialDeviceType,
    Base64URLString } = require('@simplewebauthn/server');

const passkeySchema = new mongoose.Schema({
    credentialID: {
        type: String,
        required: true,
        unique: true,
    },
    publicKey: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    webauthnUserId: {
        type: String,
        required: true,
        unique: true,
    },
    counter: {
        type: Number,
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    backedUp: {
        type: Boolean,
        required: true,
    },
    transports: {
        type: [AuthenticatorTransportFuture],
    },
});

const Passkey = mongoose.model('Passkey', passkeySchema);

module.exports = Passkey;