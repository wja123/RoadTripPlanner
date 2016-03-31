'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

var Destination = require('../models/destination');


router.get('/', User.authMiddleware, function(req, res) {

    User.findById(req.user._id)
    .populate('destinations')
    .exec(function(err, user) {
        res.send(user.destinations);
    });

}); // end get

router.post('/', User.authMiddleware, function(req, res) {
    console.log(req.body);

    Destination.create(req.body, function(err, destination){
      User.findById(
          req.user._id, function(err, user) {
              user.destinations.push(destination);
              user.save(function(err, savedUser) {
                  if (err) res.status(400).send(err);
                  savedUser.password = null;
                  res.send(savedUser);
              });
          });
    });

}); // end get


router.put('/insert/:index', User.authMiddleware, function(req, res) {
    if (req.params.index >= 0 && req.params.index <= req.user.destinations.length) {
        User.findById(req.user._id, function(err, user) {
            user.destinations.splice(req.params.index, 0, req.body.destinations);
            user.save(function(err, savedUser) {
                if (err) res.status(400).send(err);
                res.send(savedUser);
            });
        });
    }
    else{
    res.status(400).send("Index is greater than array!");
    }
});

router.put('/edit/:id', User.authMiddleware, function(req, res){
  console.log(req.body);
    Destination.findOneAndUpdate({'_id': req.params.id}, req.body, function(err, destination){
      if (err) res.status(400).send(err);
        res.send(destination);
    });
});

router.delete('/:id', User.authMiddleware, function(req, res) {
    User.findById(req.user._id, function(err, user) {
        user.destinations.splice(user.destinations.indexOf(req.params.id), 1);
        user.save(function(err, savedUser) {
            if (err) res.status(400).send(err);
            Destination.findOneAndRemove({'_id': req.params.id}, function(err, destination){
              if (err) res.status(400).send('destination remove error');
              res.send(savedUser);
            });
        });
    });
});


module.exports = router;
