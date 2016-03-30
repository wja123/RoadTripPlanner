'use strict';

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jwt-simple");
var Schema = mongoose.Schema;

var User;

const JWT_SECRET = 'this is some real wicked secret. bloody hell! this is brilliant!';


// var destSchema = new mongoose.Schema({
//   name:
// })
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    destinations: [{type: Schema.Types.Mixed}]
});


userSchema.statics.register = function(userObj, cb) {
    bcrypt.hash(userObj.password, 14, function(err, hash) {

        if (err){
          return cb(err);
        } 
        User.create({
            username: userObj.password,
            password: hash
        }, function(err, dbUser) {
            if (err) {
              cb(err || "Registration Failed!");
            }
            dbUser.password = null;
            cb(null, dbUser);
        });

    })
}

userSchema.statics.authenticate = function(userObj, cb) {
    User.findOne({
        username: userObj.username
    }, function(err, dbUser) {
        if (err || !dbUser){
          cb(err || "Authentication Failed!");
        } 

        bcrypt.compare(userObj.password, dbUser.password, function(err, isGood) {
            if (err || !isGood) {
                cb(err || "Authentication Failed! Passwords do not match.");
            }

            dbUser.password = null;
            cb(null, dbUser);

        });
    });
} //end authenticate;

userSchema.methods.generateToken = function() {

    var payload = {
        iat: Date.now(),
        username: this.username,
        _id: this._id
    };

    var token = jwt.encode(payload, JWT_SECRET);
    return token;
}

userSchema.statics.authMiddleware = function(req, res, next) {
        var cookie = req.cookies.travelCookie;


    try {
        var payload = jwt.decode(cookie, JWT_SECRET);
    } catch (err) {
        console.log(err);
        res.clearCookie("travelCookie");
        return res.status(401).send(err);
    }

    User.findById(payload._id).select("-password").exec(function(err, dbUser) {
        if (err || !dbUser) {
            res.clearCookie("travelCookie");
            return res.status(400).send(err);
        }
        req.user = dbUser;
        next();
    });

}



User = mongoose.model("User", userSchema);

module.exports = User;