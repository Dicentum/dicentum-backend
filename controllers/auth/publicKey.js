const NodeRSA = require('node-rsa');
const fs = require('fs');

const publicKeyFilePath = 'certificates/public_key.pem';

const getPublicKey = (req, res) => {
    try {
        const publicKey = fs.readFileSync(publicKeyFilePath, 'utf8');

        const rsa = new NodeRSA(publicKey);

        return res.status(200).json({ publicKey: rsa.exportKey('public') });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getPublicKey };
