'use strict';


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

  var mapStyle2 = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {
      lat: -34.397,
      lng: 150.644
    },
    styles: mapStyle2
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
      var address = ["Toronto","New York","New Jersey"];
      for(var i = 0; i < address.length; i++){
        document.getElementById('address').value = address[i];
        geocodeAddress(geocoder, map);

      }
  });
}
