//creat map object
var myMap = L.map("map", {
    center: [44.4925, -99.9018],
    zoom: 4
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);


//load in the data
var sleepData = "../assets/data/500_Cities__Sleeping_less_than_7_hours_among_adults_aged___18_years.csv";
  
d3.csv(sleepData,(function(response) {

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var coordinates = response[i].GeoLocation;
    var cleanCoordinates = coordinates.replace("(","").replace(")","")

    var latlng = cleanCoordinates.split(", ")
    
    var newLatLng = latlng.map(Number)

    if (coordinates) {
      heatArray.push([newLatLng]);
    }
  }

  for (var i = 0; i < heatArray.length; i++) {

    var radius = "";
    var color = "";
    if (response[i].Data_Value > 49){
      color = "#5e0063";
      radius = response[i].Data_Value * 1500;
    }
    else if (response[i].Data_Value > 46){
      color = "#851362";
      radius = response[i].Data_Value * 1400;
    }
    else if (response[i].Data_Value > 42){
      color = "#a42e61";
      radius = response[i].Data_Value * 1300;
    }
    else if (response[i].Data_Value > 39){
      color = "#be4c60";
      radius = response[i].Data_Value * 1200;
    }
    else if (response[i].Data_Value > 36){
      color = "#d26b63";
      radius = response[i].Data_Value * 1150;
    }
    else if (response[i].Data_Value > 33){
      color = "#e28b6b";
      radius = response[i].Data_Value * 1100;
    }
    else if (response[i].Data_Value > 30){
      color = "#eeab79";
      radius = response[i].Data_Value * 1050;
    }
    else {
      color = "#f7cb8e";
      radius = response[i].Data_Value * 1000;
    }

L.circle(
  L.latLng(heatArray[i][0],heatArray[i][1]), {
    fillOpacity: 0.5,
    color: color,
    stroke: false,
    radius: radius
}).bindPopup("<h4>" + response[i].CityName + ", " + response[i].StateAbbr + "</h4><hr><h5>Sleep Deprivation Rate: " + response[i].Data_Value + "%</h5>").addTo(myMap);
}


//adding a legend to the map and using a for loop to write out the HTML code
var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'legend');
  
      colors = ["#f7cb8e","#eeab79","#e28b6b","#d26b63","#be4c60","#a42e61","#851362","#5e0063"];
      labels = ["< 30%","30% - 33%","33% - 36%","36% - 39%", "39% - 42%", "42% - 46%", "46% - 49%", "> 49%"];

  for (var i = 0; i <colors.length; i++) {
      div.innerHTML += '<li style="padding: 4px; color:white; background-color:' + colors[i] + '">' + labels[i] + '</li>';
      }

  return div;
};

legend.addTo(myMap);
}));










//===========================================================================================================================

// var sleepData = "assets/data/500_Cities__Sleeping_less_than_7_hours_among_adults_aged___18_years.csv";
// var myMap = L.map("map", {
//   center: [39.000, -98.000],
//   zoom: 4
// });
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/light-v10",
//   accessToken: API_KEY
// }).addTo(myMap);
//   d3.csv(sleepData,(function(response) {
//     // console.log(response);
//     var heatArray = [];
//     // console.log(heatArray)
//     for (var i = 0; i < response.length; i++) {
//       var coordinates = response[i].GeoLocation;
//       var cleanCoordinates = coordinates.replace("(","").replace(")","").replace(/['"]+/g, '')
//       // console.log(cleanCoordinates)
//       var latlng = cleanCoordinates.split(",")
//       arrlatlng=Object.entries(latlng)
//       if (arrlatlng[0][1]){
//         lat=arrlatlng[0][1]
//         if (arrlatlng[1][1]){
//           lng=arrlatlng[1][1]
//         }
//       }
//       //console.log(lat,lng)
//       if (lat & lng) {
//         heatArray.push([lat,lng]);
//       }
//     }
//     // console.log(heatArray)
//       var heat = L.heatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);
//     // createFeatures(heatArray);
//   }));
//   // function createFeatures(data) {
//   //   function onEachFeature(feature, layer) {
//   //     layer.bindPopup("<h3>" + response.StateDesc + "</h3>")
//   //   }
//   //   var markers = data
//   // }
//   // function createMap()
//   // L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   //   tileSize: 512,
//   //   maxZoom: 18,
//   //   zoomOffset: -1,
//   //   id: "mapbox/light-v10",
//   //   accessToken: API_KEY
//   // }).addTo(myMap);
