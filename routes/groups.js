const express = require('express');
const router = express.Router();
const {getParliamentaryGroups, postParliamentaryGroup, editParliamentaryGroup, getParliamentaryGroup} = require("../controllers/groups");
const {validateUsersPerSeats} = require("../middlewares/group");

/* GET users listing. */
router.get('/',
    getParliamentaryGroups
);

router.post('/',
    validateUsersPerSeats,
    postParliamentaryGroup
);

router.get('/:id',
    getParliamentaryGroup
);

router.put('/:id',
    validateUsersPerSeats,
    editParliamentaryGroup
);

module.exports = router;