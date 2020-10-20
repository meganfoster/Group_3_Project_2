d3.json("/city_data").then(function(state){
    console.log(state)
    
    var tbody=d3.select('tbody')
    function Table(states) {
        console.log(states)
        tbody.html("")
        states.forEach((stateData) => {
        var row = tbody.append("tr");
        Object.values(stateData).forEach((value) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
    }
Table(state)   
})


