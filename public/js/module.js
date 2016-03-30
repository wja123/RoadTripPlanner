'use strict';

var app = angular.module('travelApp', '[ui.router]');

app.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state("home",{
  url:"/",
  templateUrl:"/html/home.html",
  controller: "homeCtrl"
})
.state("map",{
  url:"/map",
  templateUrl:"/html/map.html",
  controller:"mapCtrl"
})

$urlRouterProvider.otherwise("/");
});