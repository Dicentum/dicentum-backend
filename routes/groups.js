const express = require('express');
const router = express.Router();
const {getParliamentaryGroups, postParliamentaryGroup, editParliamentaryGroup, getParliamentaryGroup, requestParliamentaryGroup, deleteRequestParliamentaryGroup, deleteParliamentaryGroup,
    approveRequestParliamentaryGroup
} = require("../controllers/groups");
const {validateUsersPerSeats} = require("../middlewares/group");
const {checkCast, validId} = require("../middlewares/utils");
const {checkUserRole} = require("../middlewares/user/checkUserRole");
const upload = require("../utils/multer");
const {authenticate} = require("../middlewares/auth");

/* GET users listing. */
router.get('/',
    authenticate,
    getParliamentaryGroups
);

router.post('/',
    authenticate,
    upload.single('file'),
    validateUsersPerSeats,
    checkUserRole('admin'),
    postParliamentaryGroup
);

router.get('/:id',
    authenticate,
    validId,
    checkCast,
    getParliamentaryGroup,
);

router.put('/:id',
    authenticate,
    upload.single('file'),
    checkCast,
    validateUsersPerSeats,
    checkUserRole('admin'),
    editParliamentaryGroup
);

router.post('/request/:id',
    authenticate,
    checkCast,
    requestParliamentaryGroup
);

router.delete('/request/:id/:user',
    authenticate,
    checkCast,
    deleteRequestParliamentaryGroup
);

router.post('/approve/:id/:userId',
    authenticate,
    checkCast,
    checkUserRole('admin'),
    approveRequestParliamentaryGroup
);

router.delete('/:id',
    authenticate,
    checkCast,
    checkUserRole('admin'),
    deleteParliamentaryGroup
);


module.exports = router;