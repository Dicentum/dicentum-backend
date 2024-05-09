const validateVotingTime = async (req, res, next) => {
    try {
        const date = req.body.date.toString();
        if(req.body.startDateVote && req.body.endDateVote){
            const startDateVote = req.body.startDateVote.toString();
            const endDateVote = req.body.endDateVote.toString();
            if(startDateVote < date){
                return res.status(400).json({ message: "Voting start date must be less than or equal to the starting date of the debate" });
            }
            if(endDateVote < startDateVote){
                return res.status(400).json({ message: "Voting end date vote must be greater than start date vote" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
    next();
}

module.exports = { validateVotingTime };