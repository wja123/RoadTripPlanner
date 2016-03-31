'use strict';

var app = angular.module('travelApp');

app.factory('UserFactory', function($http) {
    console.log("factory");

    function registerUser(user) {
        return $http.post('/users/register', user);
    }

    function loginUser(user) {
        return $http.put('/users/authenticate', user);
    }

    function getDestinations() {
        return $http.get('/destinations');
    }

    function addDestinations(destination) {
        return $http.post('/destinations', destination);
    }

    function editDestinations(destination) {
        return $http.put(`/destinations/edit/${destination._id}`, destination);
    }

    function removeDestinations(id) {
        return $http.delete(`/destinations/${id}`);
    }

    function getDirections(destObj) { 
      if(destObj){
        return $http.post("/destinations/directions",destObj);
      }
        

    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        getDestinations: getDestinations,
        addDestinations: addDestinations,
        editDestinations: editDestinations,
        removeDestinations: removeDestinations,
        getDirections:getDirections
    }

});

app.factory('MapFactory', function($http, UserFactory) {
    console.log("map factory");



    return {}
});