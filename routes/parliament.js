const express = require('express');
const router = express.Router();
const {getParliaments, getParliament, postParliament, editParliament} = require("../controllers/parliament");
const {validateAdminUser, validateTotalSeats, validatePartialSeats} = require("../middlewares/parliament");
const {validId} = require("../middlewares/utils");

router.get('/',
    getParliaments
);

router.post('/',
    validateAdminUser,
    validatePartialSeats,
    postParliament
);

router.get('/:id',
    validId,
    getParliament
);

router.put('/:id',
    validId,
    validateAdminUser,
    validatePartialSeats,
    editParliament
);

module.exports = router;