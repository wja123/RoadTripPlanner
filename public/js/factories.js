'use strict';

var app = angular.module('travelApp');

app.factory('UserFactory', function($http){
  console.log("factory");

  function registerUser(user){
    return $http.post('/users/register', user);
  }

  function loginUser(user){
    return $http.put('/users/authenticate', user);
  }

  function getDestinations(){
    return $http.get('/destinations');
  }

  function addDestinations(destination){
    return $http.post('/destinations', destination);
  }

  return{

      registerUser:registerUser,
      loginUser:loginUser,
      getDestinations:getDestinations,
      addDestinations:addDestinations
  }

});

app.factory('MapFactory', function($http, UserFactory){
  console.log("map factory");



  return {
  }
});
