'use strict';

var app = angular.module('travelApp', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state("home",{
  url:"/",
  templateUrl:"/html/home.html"
})
.state('register', {
  url:'/register',
  templateUrl:'/html/home.html',
  controller:'authCtrl'
})
.state('login', {
  url:'/login',
  templateUrl:'/html/home.html',
  controller:'authCtrl'
})
.state("map",{
  url:"/map",
  templateUrl:"/html/map.html",
  controller:"mapCtrl"
});
$urlRouterProvider.otherwise("/register");

});
