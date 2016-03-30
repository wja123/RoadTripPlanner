var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/usernames', User.authMiddleware, function(req, res) {
    User.find({}).select("-password").exec(function(err, data) {
        if (err || !data) res.status(400).send(err);
        res.send(data).status(200);
    });
});

router.post('/register', function(req, res) {
    User.register(req.body, function(err, user) {
        if (err) res.status(400).send(err);
        res.send(user);
    });
});

router.put('/authenticate', function(req, res){
  User.authenticate(req.body, function(err, user) {
    if (err) {
      res.status(400).send(err);
    }
    var token = user.generateToken();
    res.cookie('travelCookie', token).send(user);
  });
});

router.delete('/signout', function(req, res){
  res.clearCookie('travelCookie');
  res.send();
});


module.exports = router;