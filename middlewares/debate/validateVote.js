const validateVote = (req, res, next) => {
    try {
        if (!req.body.vote) {
            return res.status(400).json({ message: "Vote not found in the request" });
        }
        if (req.decryptedVote[1] !== "yes" && req.decryptedVote[1] !== "no" && req.decryptedVote[1] !== "abstain") {
            return res.status(400).json({ message: "Vote must be 'yes', 'no' or 'abstain'" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Error: " + error });
    }
    next();
}

module.exports = { validateVote };