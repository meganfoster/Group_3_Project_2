function makeResponsive() {
  
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // var svgWidth = window.innerWidth;
  // var svgHeight = window.innerHeight;

  var margin = {
    top: 20,
    right: 75,
    bottom: 60,
    left: 100
  };

  var elements = document.querySelector("#scatter")
  var positionInfo = elements.getBoundingClientRect()
  var svgHeight = positionInfo.height
  var svgWidth = positionInfo.width

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  //Import data
  d3.csv("state_data2.csv").then(function(medianIncome) {

    medianIncome.forEach(function(data) {
      data.median_income = +data.median_income;
      data.sleep_less_than_7hours = +data.sleep_less_than_7hours;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(medianIncome, d => d.median_income) * 0.9, d3.max(medianIncome, d => d.median_income) * 1.1])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(medianIncome, d => d.sleep_less_than_7hours) * 0.9, d3.max(medianIncome, d => d.sleep_less_than_7hours) * 1.1])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(medianIncome)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.median_income))
      .attr("cy", d => yLinearScale(d.sleep_less_than_7hours))
      .attr("r", "15")
      .attr("fill", "gold")
      .attr("opacity", ".5")
      .attr("stroke", "black");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Median Income: ${d.median_income}<br>Sleep less than 7 hours: ${d.sleep_less_than_7hours}`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Sleep Deprivation Rate (%)");

    
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("State Median Income");
  }).catch(function(error) {
    console.log(error);
  });
};
makeResponsive();

d3.select(window).on("resize", makeResponsive);
