'use strict';

var app = angular.module('travelApp');

app.controller('authCtrl', function($scope, $state, UserFactory) {
    console.log("home ctrl");

    console.log("current state", $state.current);

    $scope.state = $state.current;
    $scope.submit = function(user) {

        if ($scope.state.name === "register") {
            UserFactory.registerUser(user)
                .then(function(res) {
                    $state.go('login');
                }, function(err) {

                });
        } else if ($scope.state.name === "login") {

            UserFactory.loginUser(user)
                .then(function(res) {
                    $state.go('map');
                }, function(err) {
                    console.error("login error: ", err);
                });
        }
    }
});

app.controller('mapCtrl', function($scope, $state, MapFactory, UserFactory) {
    console.log("map ctrl");
    $(document).ready(function() {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });

    var addressArray;
    var address;
    var newDestinationObject = {};
    $scope.markers =[];

    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: -34.397,
            lng: 150.644
        },
        styles: mapStyle1
    });

    $scope.$watch(function() {
        return addressArray;
    }, function(curr, prev) {
      console.log(curr);
        $scope.addressList = curr;
    });

    var geocoder = new google.maps.Geocoder();

    renderDestinations();

    function renderDestinations() {
        UserFactory.getDestinations()
            .then(function(res) {
                addressArray = res.data;
                initMap();
            }, function(err) {
                if (err) console.error("get destinations err", err);
            });
    }

    function initMap() {
        address = address || [];
        console.log("address", address);

        for (var i = 0; i < addressArray.length; i++) {
            address = addressArray[i].destination;
            console.log("lat:", addressArray[i].lat);
            console.log("lng:", addressArray[i].lng);
            //geocodeAddress(geocoder, $scope.map);
            var myLatlng = new google.maps.LatLng(addressArray[i].lat, addressArray[i].lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.map,
                title: addressArray[i].destination
            });

            $scope.map.panTo(marker.getPosition());
                $scope.markers.push(marker);
        }

    } //end initMap function

    function geocodeAddress(geocoder, resultsMap) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
                $scope.markers.push(marker);
                console.log("results", results);
                console.log("marker: ", marker);
                if (newDestinationObject) {
                    newDestinationObject.lng = results[0].geometry.location.lng();
                    newDestinationObject.lat = results[0].geometry.location.lat();
                    console.log(newDestinationObject);
                    UserFactory.addDestinations(newDestinationObject)
                        .then(function(res) {
                            newDestinationObject = {};
                            addressArray = res.data.destinations;
                            renderDestinations();
                        }, function(err) {
                            console.error("add destinations error: ", err);
                        });
                }

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    $scope.addDestination = function() {
        newDestinationObject = angular.copy($scope.destinations);
        address = $scope.destinations.destination;
        $scope.destinations ={};
        console.log(newDestinationObject);
        geocodeAddress(geocoder, $scope.map);
    }

    var destInfo = new google.maps.InfoWindow();

    $scope.editing = false;

    $scope.editDestination = function(destination){
      $scope.editing = true;
    }

    $scope.updateDestination = function(destination){
      console.log("destination update: ", destination);
      UserFactory.editDestinations(destination)
      .then(function(res){
        console.log("edit res", res.data);
      }, function(err){
        console.error("update error: ", err);
      });
    }


    $scope.removeDestination = function(destination) {
        console.log("remove destination id: ", destination);
        UserFactory.removeDestinations(destination)
            .then(function(res) {
                console.log("remove dest res.data", res.data);
                deleteMarkers();
                renderDestinations();
            }, function(err) {
                console.error("remove destination error: ", err);
            });
    }

function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll($scope.map);
}

function setMapOnAll(map) {
  for (var i = 0; i < $scope.markers.length; i++) {
    $scope.markers[i].setMap(map);
  }
}

function deleteMarkers() {
  clearMarkers();
  $scope.markers = [];
}

});

var mapStyle1 = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#000000"
    }, {
        "lightness": 40
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#000000"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 21
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 17
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 29
    }, {
        "weight": 0.2
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 18
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 19
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 17
    }]
}];

var mapStyle2 = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 13
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#144b53"
    }, {
        "lightness": 14
    }, {
        "weight": 1.4
    }]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
        "color": "#08304b"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0c4152"
    }, {
        "lightness": 5
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#0b434f"
    }, {
        "lightness": 25
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#0b3d51"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "color": "#146474"
    }]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
        "color": "#021019"
    }]
}];