# Map-Run-Website
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
      directionsDisplay.setPanel(document.getElementById('direction-content'));
      document.getElementById('direction-content').className = 'yesdirections';
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

document.getElementById('btn-return').addEventListener('click', function() {
  if (waypointLatLng.length >= 2) {
    waypointLatLng.push(waypointLatLng[0]);
    writeDirections(waypointLatLng);
  }
});
