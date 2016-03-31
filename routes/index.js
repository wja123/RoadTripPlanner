var express = require('express');
var router = express.Router();
var User = require("../models/user");

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(User.authMiddleware);
router.get('/map', function(req, res){
  console.log("yay protected map");
  res.send("something");
});

router.get('/map', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
