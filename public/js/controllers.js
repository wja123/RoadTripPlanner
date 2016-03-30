'use strict';

var app = angular.module('travelApp');

app.controller('homeCtrl', function($scope, $state, UserFactory){
  console.log("home ctrl");
});

app.controller('mapCtrl', function($scope, $state, MapFactory, UserFactory){
  console.log("map ctrl");
});