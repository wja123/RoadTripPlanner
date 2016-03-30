'use strict';

var app = angular.module('travelApp');

app.factory('UserFactory', function($http){
  console.log("factory");

  return{

  }

});

app.factory('MapFactory', function($http, UserFactory){
  console.log("map factory");

  return {

  }
});

