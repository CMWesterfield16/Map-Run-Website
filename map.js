// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

var totalDistance = 0.00;
var dataDiv = document.getElementById('data-stream');
dataDiv.innerHTML = "Run Distance: " + totalDistance + " mi.";

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
  console.log("got current location");

  map.addListener('click', function(event) {
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
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


// function dirctionsInitMap() {
//         var directionsService = new google.maps.DirectionsService;
//         var directionsDisplay = new google.maps.DirectionsRenderer;
//         // var map = new google.maps.Map(document.getElementById('map'), {
//         //   zoom: 7,
//         //   center: {lat: 41.85, lng: -87.65}
//         // });
//         directionsDisplay.setMap(map);
//
//         var onChangeHandler = function() {
//           calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         //run onChangeHandler any time a new start and finish are added
//         //document.getElementById('end').addEventListener('change', onChangeHandler);
//       }
//
//       function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//         directionsService.route({
//
//           //find elements start and end, which are the values for map movement
//           origin: document.getElementById('start').value,
//           destination: document.getElementById('end').value,
//           travelMode: 'WALKING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }
