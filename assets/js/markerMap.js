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

  // console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var coordinates = response[i].GeoLocation;
    var cleanCoordinates = coordinates.replace("(","").replace(")","")

    var latlng = cleanCoordinates.split(",")

    if (coordinates) {
      heatArray.push([latlng]);
    }
  }
  console.log(heatArray);

  for (var i = 0; i < heatArray.length; i++) {

    var color = "";
    if (response[i].Data_Value > 38.1){
        color = "red";
    }
    else if (response[i].Data_Value > 35.8){
        color = "orange";
    }
    else if (response[i].Data_Value > 33.6){
        color = "yellow";
    }
    else if (response[i].Data_Value > 30.8){
        color = "green";
    }
    else {
        color = "blue";
    }


L.circle([heatArray[0],heatArray[1]], {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    radius: 20
}).bindPopup("<h1>" + sleepData.CityName + "</h1>").addTo(myMap);
}

}));








