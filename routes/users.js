var express = require('express');
var router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getUsers, getUser} = require("../controllers/users");

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

module.exports = router;
