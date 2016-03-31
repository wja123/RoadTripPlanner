'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

var Destination;

var destinationSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  description: String,
  lat: Number,
  lng: Number
});



Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
