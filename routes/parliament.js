const express = require('express');
const router = express.Router();
const {getParliaments, getParliament, postParliament, editParliament, deleteParliament} = require("../controllers/parliament");
const {validateAdminUser, validateTotalSeats, validatePartialSeats} = require("../middlewares/parliament");
const {validId} = require("../middlewares/utils");
const {authenticate} = require("../middlewares/auth");

router.get('/',
    authenticate,
    getParliaments
);

router.post('/',
    authenticate,
    validateAdminUser,
    validatePartialSeats,
    postParliament
);

router.get('/:id',
    authenticate,
    validId,
    getParliament
);

router.put('/:id',
    authenticate,
    validId,
    validateAdminUser,
    validatePartialSeats,
    editParliament
);

router.delete('/:id',
    authenticate,
    validId,
    validateAdminUser,
    deleteParliament
);

module.exports = router;