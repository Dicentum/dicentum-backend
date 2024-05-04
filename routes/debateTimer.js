const express = require('express');
const {authenticate} = require("../middlewares/auth");
const {createTimer, deleteTimer, getTimer} = require("../controllers/debateTimers");
const router = express.Router();

router.get('/:id',
    authenticate,
    getTimer
);

router.post('/',
    authenticate,
    createTimer
);

router.delete('/:id',
    authenticate,
    deleteTimer
);

module.exports = router;