const express = require('express');
const {getDebates, getDebate, postDebate, editDebate} = require("../controllers/debates");
const {validId} = require("../middlewares/utils");
const router = express.Router();


router.get('/',
    getDebates
);

router.get('/:id',
    validId,
    getDebate
);

router.post('/',
    postDebate
);

router.put('/:id',
    validId,
    editDebate
);

module.exports = router;