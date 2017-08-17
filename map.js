// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

var marker = null;

var totalDistance = 0.00;
var dataDiv = document.getElementById('data-stream');
dataDiv.innerHTML = "Run Distance: " + totalDistance + " mi.";
function setDistance() {
  var mileDistance = (totalDistance * 0.000621371).toFixed(3);
  dataDiv.innerHTML = "Run Distance: " + mileDistance + " mi.";
}

var waypointLatLng = [];
var there =[];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.980355, lng: -118.422411},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  map.addListener('click', function(event) {
    waypointLatLng.push(event.latLng);
    if (waypointLatLng.length >= 2) {
      marker.setMap(null);
      writeDirections(waypointLatLng);
    } else {
      placeMarker(event.latLng);
    }
  });

  function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function writeDirections(arr) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  for (var i = 0; i < arr.length -1; i++) {
    calculateAndDisplayRoute(directionsService,
      directionsDisplay,
      waypointLatLng[i],
      waypointLatLng[i + 1]);
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, start, finish) {
  directionsService.route({
    origin: start,
    destination: finish,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      var legs = response.routes[0].legs;
      for(var i=0; i<legs.length; ++i) {
        totalDistance += legs[i].distance.value;
      }
      setDistance();
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


var btnBacktrack = document.getElementById('btn-backtrack');
var goHome = false;
btnBacktrack.addEventListener("click", function(){
    if (goHome){
        there = waypointLatLng;
        for (i=waypointLatLng.length-2; i>-1; i--){
          waypointLatLng.push(there[i]);
          writeDirections(waypointLatLng);
        }
        goHome = false;
        btnBacktrack.className = 'side-btns return';
    } else {
        // for (i=waypointLatLng.length-1; i>=there.length; i--){
        //   location = waypointLatLng[i];
        //   marker = new google.maps.Marker({
        //     position: location,
        //     map: map
        //   });
        //   marker.setMap(null);
        //   waypointLatLng.pop();
        // }
        goHome = true;
        btnBacktrack.className = 'side-btns noreturn';
    }
});
