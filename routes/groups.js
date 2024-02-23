const express = require('express');
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getParliamentaryGroup, postParliamentaryGroup, putParliamentaryGroup} = require("../controllers/groups");

/* GET users listing. */
router.get('/',
    getParliamentaryGroup
);

router.post('/',
    postParliamentaryGroup
);

router.put('/:id',
    putParliamentaryGroup
);

module.exports = router;