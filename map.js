// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

var marker = null;

//Counts Distance
var totalDistance = (0).toFixed(3);
var givenSpeed = 6;
var totalDuration = "00:00:00";

var dataDistance = document.getElementById('data-distance');
dataDistance.innerHTML = "Run Distance: " + totalDistance + " mi.";
var speedText = document.getElementById('speed-text');
speedText.innerHTML = "Run Speed MPH: "
var speedInput = document.getElementById('speed-input');
speedInput.value = givenSpeed;
var dataDuration = document.getElementById('data-duration');
dataDuration.innerHTML = "Run Duration: " + totalDuration;

function setDistance() {
  var mileDistance = (totalDistance * 0.000621371).toFixed(3);
  dataDistance.innerHTML = "Run Distance: " + mileDistance + " mi.";

  let date = new Date(null);
  date.setSeconds(mileDistance / (givenSpeed/3600));
  var calculatedDuration = date.toISOString().substr(11, 8);
  dataDuration.innerHTML = "Run Duration: " + calculatedDuration;
}

//Array of clicked points
var waypointLatLng = [];

function initMain() {
  initMap();
  initStreet();
}

//Initializes function which is called in HTML file
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.980355, lng: -118.422411},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Geolocation -> finds you when you start the website
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

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  //Creates Display that directions are added to
  var directionsDisplay = new google.maps.DirectionsRenderer;

  //Makes map clickable. Adds to array of markers then starts drawing map
  map.addListener('click', function(event) {
    var latLng = event.latLng;
    waypointLatLng.push(latLng);
    startDrawingMap();
  });

  //Checks how long array of markers is to determine whether
  //it's empty, a start point, or directions
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

  //Places start marker
  function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
  }

  //Writes directions if two or more markers
  function writeDirections(arr) {
    var directionsService = new google.maps.DirectionsService;
    //Sets directions to display on initialized map
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, arr);
  }

  //Calculates route directions to display and add to direction list
  function calculateAndDisplayRoute(directionsService, directionsDisplay, arr) {
    var waypts = [];
    //get waypoints (any markers that aren't start and finish)
    for (var j = 1; j < (arr.length - 1); j++) {
      waypts.push({
        location: arr[j],
        //if stopover = true, each waypoint get 'A', 'B', 'C' etc
        //if stopover = false, each waypoint is just a dot, and
        //only start and finish points get 'A' and 'B'
        stopover: false
      });
    }

    //Calculates route using waypoints, start, and finish
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
        directionsDisplay.setDirections(response);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  //Resets direction list with new directions
  function updateDirectionList() {
    //clears direction list
    document.getElementById('direction-list').innerHTML = '';
    if (waypointLatLng.length >= 2){
      //if 2 or more markers, updates direction list and shows it
      directionsDisplay.setPanel(document.getElementById('direction-list'));
      document.getElementById('direction-list').className = 'yesdirections';
      document.getElementById('direction-placeholder').className = 'nodirections section-text';
    } else {
      //if no markers or only one marker, gets rid of direction list
      document.getElementById('direction-list').className = 'nodirections';
      document.getElementById('direction-placeholder').className = 'yesdirections section-text';
    }
  }

  document.getElementById('btn-return').addEventListener('click', function() {
    if (waypointLatLng.length >= 2) {
      //adds start to the waypoint list as finish
      waypointLatLng.push(waypointLatLng[0]);
      writeDirections(waypointLatLng);
    }
  });

  document.getElementById('btn-undo').addEventListener('click', function(){
    //Only undo if there exist markers to undo
    if (waypointLatLng.length >= 1) {
      waypointLatLng.splice(waypointLatLng.length - 1, 1);
      startDrawingMap();

      //If undo causes there to only be one marker, set distance to 0
      if(waypointLatLng.length == 1){
        totalDistance = 0;
        setDistance();
      }
    }
  });

  document.getElementById('btn-clear').addEventListener('click', function(){
    //sets distance to 0 and clears list of markers
    totalDistance = 0;
    setDistance();
    waypointLatLng = [];
    startDrawingMap();
  });

  var btnBacktrack = document.getElementById('btn-backtrack');
  btnBacktrack.addEventListener('click', function(){
    if (btnBacktrack.className == 'side-btns noreturn btn-properties'){
      //If backtrack was off before, turn it on and double distance travelled
      btnBacktrack.className = 'side-btns return btn-properties';
      totalDistance = totalDistance * 2;
      setDistance();
    } else {
      //If backtrack was on before, turn it off and go back to normal distance
      btnBacktrack.className = 'side-btns noreturn btn-properties';
      totalDistance = totalDistance / 2;
      setDistance();
    }
    //Right now, backtrack only changes the total distance but does not change
    //the array of location markers or the direction list
  });

  //Gets the speed input and then uses it to find duration
  document.getElementById('speed-btn').addEventListener('click', function() {
    givenSpeed = parseFloat(document.getElementById('speed-input').value);
    setDistance();
  });

  /******************** PLACES **********************/

  var searchPoint = {lat: 33.980355, lng: -118.422411};
  var searchResults = [];

  var findInput = document.getElementById('ideas-input');
  var findBtn = document.getElementById('ideas-go-btn');
  var resultsDiv = document.getElementById('ideas-output');

  initPlaces();

  function initPlaces(){
    var places = new google.maps.places.PlacesService(map);

    findBtn.addEventListener("click", function(){
      $(resultsDiv).empty();
      var radius = findInput.value / 0.000621371;

      if (waypointLatLng.length > 0){
        searchPoint = waypointLatLng[waypointLatLng.length-1];
      } else searchPoint = {lat: 33.980355, lng: -118.422411};

      places.nearbySearch({
        location: searchPoint,
        radius: radius,
        type: 'store'
      }, addResults);

      displayTopResults();
    });
  }

  function addResults(results, status) {
    searchResults = results;
  }

  function displayTopResults(){
    trimResults(5);

    for (i=0; i<searchResults.length; i++){
      display(searchResults[i]);
    }
  }

  function trimResults(n){
    searchResults = searchResults.slice(0,n);
  }

  function display(result){
    var name = result.name;
    var location = result.geometry.location;
    var marker;

    var div = document.createElement('div');
    div.className = 'result-display';
    div.innerText = name;

    div.addEventListener("mouseover", function(){
      marker = new google.maps.Marker({
        map: map,
        position: location
      });
    });

    div.addEventListener("mouseleave", function(){
      marker.setMap(null);
    });

    div.addEventListener("click", function(){
      waypointLatLng.push(location);
      startDrawingMap();
    });

    resultsDiv.append(div);
  }

}

/******************   STREET VIEW **********************/

var index = 0;
var panorama;
function initStreet() {
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('streetView'),
      {
        position: {lat: 33.980355, lng: -118.422411},
        pov: {heading: 165, pitch: 0},
        zoom: 1
      });
}

// STREET VIEW PLAYER
var running = false;
var player = document.getElementById('streetView');
var playButton = document.getElementById('street-play');
playButton.addEventListener("click", function(){
  if (running){
    running = false;
    playButton.className = 'side-btns stopped btn-properties';
    playButton.innerText = 'STREET';
    map = document.getElementById('map');
    map.className = 'google-active';
    streetView = document.getElementById('streetView');
    streetView.className = 'google-not-active';
    lBtn.className = 'side-btns ctrlBtns controls-not-active btn-properties';
    rBtn.className = 'side-btns ctrlBtns controls-not-active btn-properties';
  } else {
    running = true;
    playButton.className = 'side-btns running btn-properties';
    playButton.innerText = 'MAP';
    map = document.getElementById('map');
    map.className = 'google-not-active';
    streetView = document.getElementById('streetView');
    streetView.className = 'google-active';

    lBtn.className = 'side-btns ctrlBtns google-active btn-properties';
    rBtn.className = 'side-btns ctrlBtns google-active btn-properties';

    if (waypointLatLng.length != 0){
      panorama = new google.maps.StreetViewPanorama(
       player,
       {
         position: waypointLatLng[0]
       }
     );
    } else {
      panorama = new google.maps.StreetViewPanorama(
        player,
        {
          position: {lat: 33.980355, lng: -118.422411}
        }
      );
    }
  }

  lBtn.addEventListener("click", function() {
    if (index > 0){
      index--;
      panorama = new google.maps.StreetViewPanorama(
        player,
        {
          position: waypointLatLng[index]
        }
      );
    }
  });

  rBtn.addEventListener("click", function() {
    if (index < waypointLatLng.length-1){
      index++;
      panorama = new google.maps.StreetViewPanorama(
        player,
        {
          position: waypointLatLng[index]
        }
      );
    }
  });
});



/******************** PLACES **********************/
