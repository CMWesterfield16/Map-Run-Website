// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

var marker = null;

var totalDistance = (0).toFixed(3);
var dataDiv = document.getElementById('data-stream');
dataDiv.innerHTML = "Run Distance: " + totalDistance + " mi.";
function setDistance() {
  var mileDistance = (totalDistance * 0.000621371).toFixed(3);
  dataDiv.innerHTML = "Run Distance: " + mileDistance + " mi.";
}

var waypointLatLng = [];

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

  var directionsDisplay = new google.maps.DirectionsRenderer;

  map.addListener('click', function(event) {
    var latLng = event.latLng;
    waypointLatLng.push(latLng);
    startDrawingMap();
  });

  function startDrawingMap() {
    if (waypointLatLng.length >= 2) {
      marker.setMap(null);
      writeDirections(waypointLatLng);
    } else if (waypointLatLng.length == 1) {
      if (marker !== null) {
        marker.setMap(null);
      }
      directionsDisplay.setMap(null);
      placeMarker(waypointLatLng[0]);
    } else {
      if (marker !== null) {
        marker.setMap(null);
      }
      directionsDisplay.setMap(null);
    }
    updateDirectionList();
  }

  function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
  }

  function writeDirections(arr) {
    var directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, arr);
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, arr) {
    var waypts = [];
    for (var j = 1; j < (arr.length - 1); j++) {
      waypts.push({
        location: arr[j],
        stopover: false
      });
    }

    directionsService.route({
      origin: arr[0],
      destination: arr[arr.length - 1],
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        //Updates Distance
        var legs = response.routes[0].legs;
        for(var i=0; i<legs.length; ++i) {
          totalDistance = legs[i].distance.value;
        }
        setDistance();

        //Updates Map Drawn directions
        //directionsDisplay.setDirections(null);
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  function updateDirectionList() {
    document.getElementById('direction-list').innerHTML = '';
    if (waypointLatLng.length >= 2){
      directionsDisplay.setPanel(document.getElementById('direction-list'));
      document.getElementById('direction-content').className = 'yesdirections';
    } else {
      document.getElementById('direction-content').className = 'nodirections';
    }
  }

  document.getElementById('btn-return').addEventListener('click', function() {
    if (waypointLatLng.length >= 2) {
      waypointLatLng.push(waypointLatLng[0]);
      writeDirections(waypointLatLng);
    }
  });

  document.getElementById('btn-undo').addEventListener('click', function(){
    if (waypointLatLng.length >= 1) {
      waypointLatLng.splice(waypointLatLng.length - 1, 1);
      startDrawingMap();

      if(waypointLatLng.length == 1){
        totalDistance = 0;
        setDistance();
      }
    }
  });

  document.getElementById('btn-clear').addEventListener('click', function(){
    totalDistance = 0;
    setDistance();
    waypointLatLng = [];
    startDrawingMap();
  });

  var btnBacktrack = document.getElementById('btn-backtrack');
  btnBacktrack.addEventListener('click', function(){
    if (btnBacktrack.className == 'side-btns noreturn'){
      btnBacktrack.className = 'side-btns return';
      totalDistance = totalDistance * 2;
      setDistance();
    } else {
      btnBacktrack.className = 'side-btns noreturn';
      totalDistance = totalDistance / 2;
      setDistance();
    }
  });
}






/******************   STREET VIEW **********************/

var panorama;
function initialize() {
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('streetView'),
      {
        position: {lat: 33.980355, lng: -118.422411},
        pov: {heading: 165, pitch: 0},
        zoom: 1
      });
}