const express = require('express');
const {getDebates, getDebate, postDebate, editDebate, deleteDebate} = require("../controllers/debates");
const {validId} = require("../middlewares/utils");
const {authenticate} = require("../middlewares/auth");
const router = express.Router();


router.get('/',
    authenticate,
    getDebates
);

router.get('/:id',
    validId,
    authenticate,
    getDebate
);

router.post('/',
    authenticate,
    postDebate
);

router.put('/:id',
    validId,
    authenticate,
    editDebate
);

router.delete('/:id',
    validId,
    authenticate,
    deleteDebate
);

module.exports = router;