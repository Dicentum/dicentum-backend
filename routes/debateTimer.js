const express = require('express');
const {authenticate} = require("../middlewares/auth");
const {createTimer, deleteTimer} = require("../controllers/debateTimers");
const router = express.Router();

router.post('/',
    authenticate,
    createTimer
);

router.delete('/:id',
    authenticate,
    deleteTimer
);