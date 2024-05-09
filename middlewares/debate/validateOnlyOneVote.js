const userVotes = require('../../models/userVotes');

const validateOnlyOneVote = async (req, res, next) => {
    try {
        const user = req.user._id;
        const debate = req.params.id;

        const userVote = await userVotes.findOne({ debate, user });
        if(userVote) return res.status(400).json({ message: "User already voted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
    next();
}

module.exports = { validateOnlyOneVote };