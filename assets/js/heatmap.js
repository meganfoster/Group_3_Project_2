
// var sleepData = "assets/data/500_Cities__Sleeping_less_than_7_hours_among_adults_aged___18_years.csv";
  
//   d3.csv(sleepData,(function(response) {
  
//     // console.log(response);
  
//     var heatArray = [];
  
//     for (var i = 0; i < response.length; i++) {
//       var coordinates = response[i].GeoLocation;
//       var cleanCoordinates = coordinates.replace("(","").replace(")","")

//       var latlng = cleanCoordinates.split(",")
  
//       if (coordinates) {
//         heatArray.push([latlng]);
//       }
//     }
//     createFeatures(heatArray);
//   }));

//   function createFeatures(data) {

//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + response.StateDesc + "</h3>")
//     }

//     var markers = data
//   }


//   function createMap()

//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY
//   }).addTo(myMap);


//   var myMap = L.map("map-id", {
//     center: [39.000, -98.000],
//     zoom: 5
//   });
 
