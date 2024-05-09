const express = require('express');
const router = express.Router();
const {getParliamentaryGroups, postParliamentaryGroup, editParliamentaryGroup, getParliamentaryGroup, requestParliamentaryGroup, deleteRequestParliamentaryGroup, deleteParliamentaryGroup,
    approveRequestParliamentaryGroup
} = require("../controllers/groups");
const {validateUsersPerSeats} = require("../middlewares/group");
const {checkCast, validId} = require("../middlewares/utils");
const {checkUserRole} = require("../middlewares/user/checkUserRole");
const upload = require("../utils/multer");

/* GET users listing. */
router.get('/',
    getParliamentaryGroups
);

router.post('/',
    upload.single('file'),
    validateUsersPerSeats,
    postParliamentaryGroup
);

router.get('/:id',
    validId,
    checkCast,
    getParliamentaryGroup,
);

router.put('/:id',
    upload.single('file'),
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

router.post('/approve/:id/:userId',
    checkCast,
    checkUserRole('admin'),
    approveRequestParliamentaryGroup
);

router.delete('/:id',
    checkCast,
    deleteParliamentaryGroup
);


module.exports = router;