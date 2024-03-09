const express = require('express');
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getParliamentaryGroups, postParliamentaryGroup, putParliamentaryGroup, getParliamentaryGroup} = require("../controllers/groups");

/* GET users listing. */
router.get('/',
    getParliamentaryGroups
);

router.post('/',
    postParliamentaryGroup
);

router.get('/:id',
    getParliamentaryGroup
);

router.put('/:id',
    putParliamentaryGroup
);

module.exports = router;