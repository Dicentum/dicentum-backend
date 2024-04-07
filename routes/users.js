const express = require('express');
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getUsers, getUser, editUser} = require("../controllers/users");
const {checkCast} = require("../middlewares/utils");

const multer = require('multer');
const upload = require('../utils/multer');

/* GET users listing. */
router.get('/',
    getUsers
);

/* GET exact user */
router.get('/:id',
    checkCast,
    authenticate,
//    checkUserOwnership,
    getUser
);

/* EDIT exact user */
router.put('/:id',
    upload.single('file'),
    checkCast,
    authenticate,
    checkUserOwnership,
    editUser
);

router.delete('/:id',
    checkCast,
    authenticate,
    checkUserOwnership,
    editUser
);

module.exports = router;
