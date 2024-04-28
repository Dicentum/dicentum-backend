const express = require('express');
const { register, login, validate, registerKeyStart, registerKeyFinish, loginKeyStart, loginKeyFinish } = require('../controllers/auth');
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validate/:id', validate);

router.get('/registerKey/start',
    authenticate,
    registerKeyStart
);

router.post('/registerKey/finish',
    authenticate,
    registerKeyFinish
);

router.get('/loginKey/start',
    authenticate,
    loginKeyStart
);

router.post('/loginKey/finish',
    authenticate,
    loginKeyFinish
);

router.get('/', authenticate, (req, res) => {
    try {
        res.json({
            user: `${req.user.username}`,
            email: `${req.user.email}`,
            userRole: `${req.user.role}`,
            id: `${req.user._id}`,
            name: `${req.user.name}`,
            surname: `${req.user.surname}`,
            photo: `${req.user.photo}`,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
});

module.exports = router;