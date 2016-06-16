var map;
var map2;
var map3;
var map4;
var infoWindow; // 顯示在marker上的window 
// var markers = []; // 要顯示的所有marker

var map2_markers = []
var map3_markers = []
var map4_markers = []

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { // 將預設地圖中心放在以下地點
      lat: 34.667936,
      lng: 135.502151
    },
    zoom: 12,
    streetViewControl: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    disableDoubleClickZoom: true
  });
  map2 = new google.maps.Map(document.getElementById('map2'), {
    center: { // 將預設地圖中心放在以下地點
      lat: 34.667936,
      lng: 135.502151
    },
    zoom: 12,
    streetViewControl: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    disableDoubleClickZoom: true,
        scaleControl: false,
    scrollwheel: false
  });
  map3 = new google.maps.Map(document.getElementById('map3'), {
    center: { // 將預設地圖中心放在以下地點
      lat: 34.667936,
      lng: 135.502151
    },
    zoom: 12,
    streetViewControl: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    disableDoubleClickZoom: true,
        scaleControl: false,
    scrollwheel: false
  });
  map4 = new google.maps.Map(document.getElementById('map4'), {
    center: { // 將預設地圖中心放在以下地點
      lat: 34.667936,
      lng: 135.502151
    },
    zoom: 12,
    streetViewControl: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    disableDoubleClickZoom: true,
        scaleControl: false,
    scrollwheel: false
  });
  // 產生一個infoWindow
  infoWindow = new google.maps.InfoWindow();
  addMarkersToMaps()
}


//在latlng座標上建地marker跟其infoWindow
function createMarker(latlng, name, links) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: name
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
    infoWindow.title = name;

    var content = "<h2  class='firstHeading'>" + name + "</h2>"
    if (links.length > 0) {
      content += "<p>相關熱門文章</p>"
      for (var j = 0; j < links.length; j++) {
        content += "<p><a href='" + links[j]["link"] + "'>" + links[j]["title"] + "</a></p>"
      }
    }
    infoWindow.setContent(content);
  });
}

function createMarker2(latlng, name, links) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map2,
    title: name
  });
  map2_markers.push(marker);
  marker.addListener('linkClicked', function() {
    infoWindow.open(map2, marker);
    infoWindow.title = name;

    var content = "<h2  class='firstHeading'>" + name + "</h2>"
    if (links.length > 0) {
      content += "<p>相關熱門文章</p>"
      for (var j = 0; j < links.length; j++) {
        content += "<p><a href='" + links[j]["link"] + "'>" + links[j]["title"] + "</a></p>"
      }
    }
    infoWindow.setContent(content);
  });
}
function createMarker3(latlng, name, links) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map3,
    title: name
  });
  map3_markers.push(marker);
  marker.addListener('linkClicked', function() {
    infoWindow.open(map3, marker);
    infoWindow.title = name;
    var content = "<h2  class='firstHeading'>" + name + "</h2>"
    if (links.length > 0) {
      content += "<p>相關熱門文章</p>"
      for (var j = 0; j < links.length; j++) {
        content += "<p><a href='" + links[j]["link"] + "'>" + links[j]["title"] + "</a></p>"
      }
    }
    infoWindow.setContent(content);
  });
}
function createMarker4(latlng, name, links) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map4,
    title: name
  });
  map4_markers.push(marker);
  marker.addListener('linkClicked', function() {
    infoWindow.open(map4, marker);
    infoWindow.title = name;

    var content = "<h2  class='firstHeading'>" + name + "</h2>"
    if (links.length > 0) {
      content += "<p>相關熱門文章</p>"
      for (var j = 0; j < links.length; j++) {
        content += "<p><a href='" + links[j]["link"] + "'>" + links[j]["title"] + "</a></p>"
      }
    }
    infoWindow.setContent(content);
  });
}
/*
 * you may not change the codes below
 */

//清除地圖上的markers
// function clearLocations() {
//   infoWindow.close();
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

function addMarkersToMaps() {
  for (var i = 0; i < places.length; i++) {
    var name = places[i]["name"];
    var location = places[i]["location"];
    var latlng = new google.maps.LatLng(
      parseFloat(location["lat"]),
      parseFloat(location["lng"])
    );
    var links = places[i]["links"]
    createMarker(latlng, name, links);
  }

  for (var i = 0; i < route1_places.length; i++) {
    var name = route1_places[i]["name"];
    var location = route1_places[i]["location"];
    var latlng = new google.maps.LatLng(
      parseFloat(location["lat"]),
      parseFloat(location["lng"])
    );
    var links = route1_places[i]["links"]
    createMarker2(latlng, name, links);
    aid = "route1-" + i
    document.getElementById(aid).addEventListener("click", function(event) {
      var n = event.target.getAttribute("data-aid")
      new google.maps.event.trigger(map2_markers[n], 'linkClicked');
    });
  }
  for (var i = 0; i < route2_places.length; i++) {
    var name = route2_places[i]["name"];
    var location = route2_places[i]["location"];
    var latlng = new google.maps.LatLng(
      parseFloat(location["lat"]),
      parseFloat(location["lng"])
    );
    var links = route2_places[i]["links"]
    createMarker3(latlng, name, links);
    aid = "route2-" + i
    document.getElementById(aid).addEventListener("click", function(event) {
      var n = event.target.getAttribute("data-aid")
      new google.maps.event.trigger(map3_markers[n], 'linkClicked');
    });
  }
  for (var i = 0; i < route3_places.length; i++) {
    var name = route3_places[i]["name"];
    var location = route3_places[i]["location"];
    var latlng = new google.maps.LatLng(
      parseFloat(location["lat"]),
      parseFloat(location["lng"])
    );
    var links = route3_places[i]["links"]
    createMarker4(latlng, name, links);
    aid = "route3-" + i
    document.getElementById(aid).addEventListener("click", function(event) {
      var n = event.target.getAttribute("data-aid")
      new google.maps.event.trigger(map4_markers[n], 'linkClicked');
    });
  }
}