const validateUsersPerSeats = async (req, res, next) => {
    try {
        const seats = parseInt(req.body.seats);
        const users = req.body.users;

        if(seats !== undefined && users !== undefined){
            if (seats <= 0) {
                return res.status(400).json({message: "Seats must be a positive number"});
            }

            if (users.length > seats) {
                return res.status(400).json({message: "Number of users cannot be greater than the number of seats"});
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Error in validations: "+error});
    }

    next();
}

module.exports = { validateUsersPerSeats };