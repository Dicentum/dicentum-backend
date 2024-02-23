var express = require('express');
var router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getUsers, getUser, editUser} = require("../controllers/users");

/* GET users listing. */
router.get('/',
    getUsers
);

/* GET exact user */
router.get('/:id',
    authenticate,
    checkUserOwnership,
    getUser
);

/* EDIT exact user */
router.put('/:id',
    authenticate,
    checkUserOwnership,
    editUser
);

module.exports = router;
