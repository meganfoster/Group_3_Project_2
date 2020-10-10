// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;
}

//Import data
d3.csv("median_income_by_state.csv").then(function(medianIncome) {

    console.log(response);
}