const express = require('express');
const {authenticate} = require("../middlewares/auth");
const {createTimer, deleteTimer, getTimer} = require("../controllers/debateTimers");
const {checkUserRole} = require("../middlewares/user/checkUserRole");
const router = express.Router();

router.get('/:id',
    authenticate,
    getTimer
);

router.post('/',
    authenticate,
    checkUserRole("admin"),
    createTimer
);

router.delete('/:id',
    authenticate,
    checkUserRole("admin"),
    deleteTimer
);

module.exports = router;