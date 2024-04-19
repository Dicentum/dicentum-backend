const express = require('express');
const router = express.Router();
const {getParliamentaryGroups, postParliamentaryGroup, editParliamentaryGroup, getParliamentaryGroup, requestParliamentaryGroup, deleteRequestParliamentaryGroup, deleteParliamentaryGroup,
    approveRequestParliamentaryGroup
} = require("../controllers/groups");
const {validateUsersPerSeats} = require("../middlewares/group");
const {checkCast, validId} = require("../middlewares/utils");
const {checkUserRole} = require("../middlewares/user/checkUserRole");

/* GET users listing. */
router.get('/',
    getParliamentaryGroups
);

router.post('/',
    validateUsersPerSeats,
    postParliamentaryGroup
);

router.get('/:id',
    validId,
    checkCast,
    getParliamentaryGroup,
);

router.put('/:id',
    checkCast,
    validateUsersPerSeats,
    editParliamentaryGroup
);

router.post('/request/:id',
    checkCast,
    requestParliamentaryGroup
);

router.delete('/request/:id/:user',
    checkCast,
    deleteRequestParliamentaryGroup
);

router.post('/approve/:id/:user',
    checkCast,
    checkUserRole('admin'),
            approveRequestParliamentaryGroup
);

router.delete('/:id',
    checkCast,
    deleteParliamentaryGroup
);


module.exports = router;