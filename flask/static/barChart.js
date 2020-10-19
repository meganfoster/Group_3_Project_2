d3.csv("../assets/data/state_data2.csv", function(data) {

    data.forEach(function (d) {
        d.ARTHRITIS = +d.ARTHRITIS;
        d.BPHIGH = +d.BPHIGH;
        d.CANCER = +d.CANCER;
        d.ASTHMA = +d.ASTHMA;
        d.SMOKING = +d.SMOKING;
        d.DIABETES = +d.DIABETES;
        d.HIGHCHOL = +d.HIGHCHOL;
        d.KIDNEY_DISEASE = +d.KIDNEY_DISEASE;
        d.OBESITY = +d.OBESITY;
        d.sleep_less_than_7hours = +d.sleep_less_than_7hours;
    });
    console.log(data[0]);

    // Create Dropdown Options   
    var select = document.getElementById("selDataset");
    var options = []

    data.map(function (d) {
        options.push(d.state);
    });
    // console.log(options)

    for (var i = 0; i < options.length; i++) {
        var opt = options[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    }

    // Display the default plot
    // Isolate All_State Data
    var state_data = data
    var all_states = state_data[0]
    // console.log(all_states)

    // Slice the first 10 OTUs for plotting
    var barids = ["< 7 HOURS SLEEP", "ARTHRITIS", "HIGH BP", "CANCER", "ASTHMA", "SMOKING", "DIABETES", "HIGH CHOL", "KIDNEY DIS.", "OBESITY"]
    var bar_values = []

    var sleep = all_states.sleep_less_than_7hours
    bar_values.push(sleep)
    var arthritis = all_states.ARTHRITIS
    bar_values.push(arthritis)
    var high_bp = all_states.BPHIGH
    bar_values.push(high_bp)
    var cancer = all_states.CANCER
    bar_values.push(cancer)
    var asthma = all_states.ASTHMA
    bar_values.push(asthma)
    var smoking = all_states.SMOKING
    bar_values.push(smoking)
    var diabetes = all_states.DIABETES
    bar_values.push(diabetes)
    var high_chol = all_states.HIGH_CHOL
    bar_values.push(high_chol)
    var kidney = all_states.KIDNEY_DISEASE
    bar_values.push(kidney)
    var obesity = all_states.OBESITY
    bar_values.push(obesity)

    var barColors = ["#e28b6b","#eeab79","#f7cb8e","#eeab79","#e28b6b","#d26b63","#be4c60","#a42e61","#851362","#5e0063"];

    // Display sleep rate percent
    var panel = d3.select("#sample-metadata")
    panel.append("p").text(`United States Rate: ${sleep}%`)

    // Trace1 for the Data
    var trace1 = {
        x: bar_values,
        y: barids,
        type: "bar",
        orientation: "h",
        marker: {
          color: barColors.reverse()
        }
    };

    // data
    var bar_data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
      xaxis: {
          title: {
              text: "Percentage of Population"
          }
      },
      margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
      },
      title: "Sleep Deprivation & Negative Health Factors"
  };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", bar_data, layout);
    
    var chart_options = {
      series: [{
            name: "All States %",
            data: bar_values
          },
          {
            name: "Selected State %",
            data: bar_values
          }
        ],
          chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#e28b6b", "#5e0063"],
        stroke: {
          width: [7, 5],
          curve: 'smooth',
          dashArray: [0, 5]
        },
        title: {
          text: 'All States Sleep and Health Factors by Population Percentage vs. Selected State',
          align: 'left'
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: barids
        },
        grid: {
          borderColor: '#f1f1f1',
        }
        };

      var chart = new ApexCharts(document.querySelector("#bubble"), chart_options);
      
      chart.render();

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        // console.log(dataset)

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];

            if (dataset == opt) {
                index = i;
            }
        }

        // console.log(index)
        // console.log(state_data[index])

        // Isolate selected state
        var state = state_data[index]
        // console.log(state)

        var barids = ["< 7 HOURS SLEEP", "ARTHRITIS", "HIGH BP", "CANCER", "ASTHMA", "SMOKING", "DIABETES", "HIGH CHOL", "KIDNEY DIS.", "OBESITY"]
        var state_bar_values = []

        var state_sleep = state.sleep_less_than_7hours
        state_bar_values.push(state_sleep)
        var state_arthritis = state.ARTHRITIS
        state_bar_values.push(state_arthritis)
        var state_high_bp = state.BPHIGH
        state_bar_values.push(state_high_bp)
        var state_cancer = state.CANCER
        state_bar_values.push(state_cancer)
        var state_asthma = state.ASTHMA
        state_bar_values.push(state_asthma)
        var state_smoking = state.SMOKING
        state_bar_values.push(state_smoking)
        var state_diabetes = state.DIABETES
        state_bar_values.push(state_diabetes)
        var state_high_chol = state.HIGH_CHOL
        state_bar_values.push(state_high_chol)
        var state_kidney = state.KIDNEY_DISEASE
        state_bar_values.push(state_kidney)
        var state_obesity = state.OBESITY
        state_bar_values.push(state_obesity)
        console.log(state_bar_values)

        var barColors = ["#e28b6b","#eeab79","#f7cb8e","#eeab79","#e28b6b","#d26b63","#be4c60","#a42e61","#851362","#5e0063"];

        // Display Sleep Percent for State
        d3.select("#sample-metadata")
            .selectAll("p")
            .data(sleep)
            .exit()
            .remove();
        var panel = d3.select("#sample-metadata")
        panel.append("p").text(`${dataset} Rate: ${state_sleep}%`)

        // console.log(state_bar_values)

        // Trace1 for the Data
        var trace1 = {
            x: state_bar_values,
            y: barids,
            type: "bar",
            orientation: "h",
            marker: {
              color: barColors.reverse()
            }
        };

        // data
        var bar_data = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
          xaxis: {
              title: {
                  text: "Percentage of Population"
              }
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
          },
          title: "Sleep Deprivation & Negative Health Factors"
      };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", bar_data, layout);

        console.log(state_bar_values)

        chart.updateSeries([{
          name: "All States %",
          data: bar_values
        },
        {
          name: "Selected State %",
          data: state_bar_values
        }
      ])

    };
});

