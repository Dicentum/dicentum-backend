var express = require('express');
var router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getParliamentaryGroup, postParliamentaryGroup} = require("../controllers/groups");

/* GET users listing. */
router.get('/',
    getParliamentaryGroup
);

router.post('/',
    postParliamentaryGroup
);

module.exports = router;