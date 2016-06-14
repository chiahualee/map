var map;
var infoWindow; // 顯示在marker上的window 
// var markers = []; // 要顯示的所有marker
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
    if (links.length > 0) {
      content = "<h2  class='firstHeading'>" + name + "</h2>" +
        "<p>相關熱門文章</p>"
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
function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//從Parse資料庫中讀取給予位置的附近地點
function getNearNodes(lat, lng, radius) {
  var PlaceObject = Parse.Object.extend("PlaceObject");
  var query = new Parse.Query(PlaceObject);
  // Interested in locations near user.
  var point = new Parse.GeoPoint({
    latitude: lat,
    longitude: lng
  });
  query.near("location", point);
  query.withinKilometers("location", point, radius)
    // Limit what could be a lot of points.
  query.limit(20);
  // Final list of objects
  query.find({
    success: function(placesObjects) {
      //將搜尋結果加入地圖
      addMarkersToMaps(placesObjects);
    }
  });
}


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
}