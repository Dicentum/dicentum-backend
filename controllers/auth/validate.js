const User = require("../../models/users");
const validate = async (req, res, next) => {
    try{
        if (req.params.id === 'undefined') {
            return res.status(404).json({ message: 'User not defined' });
        }
        const user = await User.findById(req.params.id);
        const verifyCode = req.body.verification.toString();
        
        if(!verifyCode){
            return res.status(400).json({ message: 'Verification code is required' });
        }

        if(user.verified){
            return res.status(400).json({ message: 'User already verified' });
        }

        if(user && !user.verified){
            const verificationMatch = await user.compareVerificationCode(verifyCode);
            if(verificationMatch){
                user.verified = true;
                user.verification = null;
                await user.save();
                return res.status(200).json({ message: 'User verified' });
            } else {
                return res.status(401).json({ message: 'Invalid verification code' });
            }
        } else {
            return res.status(404).json({ message: 'User or verification not found' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { validate };