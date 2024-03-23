const express = require('express');
const router = express.Router();
const {getParliaments, getParliament, postParliament, editParliament} = require("../controllers/parliament");
const {validateAdminUser, validateTotalSeats, validatePartialSeats} = require("../middlewares/parliament");

router.get('/',
    getParliaments
);

router.post('/',
    validateAdminUser,
    validatePartialSeats,
    postParliament
);

router.get('/:id',
    getParliament
);

router.put('/:id',
    validateAdminUser,
    validatePartialSeats,
    editParliament
);

module.exports = router;