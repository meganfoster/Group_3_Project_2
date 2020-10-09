var myMap = L.map("map", {
    center: [39.000, -98.000],
    zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: "pk.eyJ1IjoiYXZlcnlrZXYiLCJhIjoiY2tmb3E2M2p1MDJldTJxbXIzbThnODVjZyJ9.pIvdoYlUD16lir88dz7dIg"
  }).addTo(myMap);
  
var sleepData = "assets/data/500_Cities__Sleeping_less_than_7_hours_among_adults_aged___18_years.csv";
  
  d3.json(sleepData, function(response) {
  
    console.log(response);})
  
//     var heatArray = [];
  
//     for (var i = 0; i < response.length; i++) {
//       var location = response[i].location;
  
//       if (location) {
//         heatArray.push([location.coordinates[1], location.coordinates[0]]);
//       }
//     }
  
//     var heat = L.heatLayer(heatArray, {
//       radius: 20,
//       blur: 35
//     }).addTo(myMap);
  
//   })