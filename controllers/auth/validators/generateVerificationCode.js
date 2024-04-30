// generateVerificationCode.js
const crypto = require('crypto');

const generateVerificationCode = () => {
    const code = crypto.randomInt(100000, 999999);
    return code;
}

module.exports = generateVerificationCode;