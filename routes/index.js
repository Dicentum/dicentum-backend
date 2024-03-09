const express = require('express');
const {getIP} = require("../middlewares/utils");
const {PORT, MODE} = require("../utils/config");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dicentum API', ip: getIP(req), port: PORT, mode: MODE });
});

module.exports = router;
