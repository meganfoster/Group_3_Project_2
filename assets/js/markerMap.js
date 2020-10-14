//creat map object
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
    accessToken: API_KEY
}).addTo(myMap);


//load in the data
var sleepData = "assets/data/500_Cities__Sleeping_less_than_7_hours_among_adults_aged___18_years.csv";
  
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

    var color = "";
    if (response[i].Data_Value > 38){
      color = "#035606";
    }
    else if (response[i].Data_Value > 35){
      color = "#06a40b";
    }
    else if (response[i].Data_Value > 33){
      color = "#09f311";
    }
    else if (response[i].Data_Value > 30){
      color = "#56f85b";
    }
    else {
      color = "#a4fba7";
    }

L.circle(
  L.latLng(heatArray[i][0],heatArray[i][1]), {
    fillOpacity: 0.5,
    color: color,
    stroke: false,
    radius: response[i].Data_Value * 1200
}).bindPopup("<h4>" + response[i].CityName + ", " + response[i].StateAbbr + "</h4><hr><h5>Sleep Deprivation Rate: " + response[i].Data_Value + "%</h5>").addTo(myMap);
}


//adding a legend to the map and using a for loop to write out the HTML code
var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'legend');
  
      colors = ["#a4fba7","#56f85b","#09f311","#06a40b","#035606"];
      labels = ["< 30%", "30% - 33%", "33% - 35%", "35% - 38%", "> 38%"];

  for (var i = 0; i <colors.length; i++) {
      div.innerHTML += '<li style="padding: 4px; background-color:' + colors[i] + '">' + labels[i] + '</li>';
      }

  return div;
};

legend.addTo(myMap);
}));
