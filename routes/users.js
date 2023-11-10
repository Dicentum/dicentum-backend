var express = require('express');
var router = express.Router();
const User = require("../models/users")
const { authenticate } = require("../middlewares/auth");
const { checkUserOwnership } = require("../middlewares/user/index");

const {getUsers} = require("../controllers/users");

/* GET users listing. */
router.get('/',
    getUsers
);

/* GET exact user */
router.get('/:id', authenticate, checkUserOwnership, async function (req, res, next) {
  try{
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  }
  catch (error){
    console.error(error);
    res.status(500).json({ message: "Internal Error: "+error });
  }
});

module.exports = router;
