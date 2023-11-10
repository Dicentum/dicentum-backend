const express = require('express');
const { register, login } = require('../controllers/auth');
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/', authenticate, (req, res) => {
    try {
        res.json({message: `Welcome ${req.user.username}`});
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
});

module.exports = router;