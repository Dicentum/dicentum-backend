const express = require('express');
const router = express.Router();
const {getParliaments, getParliament, postParliament, editParliament} = require("../controllers/parliament");
const {validateAdminUser, validateTotalSeats} = require("../middlewares/parliament");

router.get('/',
    getParliaments
);

router.post('/',
    validateAdminUser,
    validateTotalSeats,
    postParliament
);

router.get('/:id',
    getParliament
);

router.put('/:id',
    validateAdminUser,
    validateTotalSeats,
    editParliament
);

module.exports = router;