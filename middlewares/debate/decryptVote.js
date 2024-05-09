const fs = require('fs');
const {body} = require("express-validator");
const NodeRSA = require('node-rsa');
const JSEncrypt = require('node-jsencrypt');

const privateKeyFilePath = 'certificates/private_key.pem';

const decryptVote = (req, res, next) => {
    try {
        const privateKey = fs.readFileSync(privateKeyFilePath, 'utf8');

        if(!req.body.vote) return res.status(400).json({ message: "Vote not found in the request" });

        let crypt = new JSEncrypt();
        crypt.setPrivateKey(privateKey);
        let enc = crypt.decrypt(req.body.vote);

        req.decryptedVote = enc.split(";");

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = { decryptVote };