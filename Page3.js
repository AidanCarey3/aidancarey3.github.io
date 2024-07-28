const Page3 = {
  title: "Voter Turnout by Year",
  description: "This chart shows voter turnout, measured as the percent who were eligible to vote that did, from 2000 to 2020.",
  filter2Label: "Election Years Only",
  filter3Label: "Non-Election Years Only",
  chart: function(filtered = false, filterType = 'default') {
      const margin = { top: 20, right: 20, bottom: 50, left: 80 }, 
            width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
            height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;

      const svg = d3.select("#left-box").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
      
      let data = [
          { year: 2000, vepHighestOffice: 55.3 },
          { year: 2002, vepHighestOffice: 40.5 },
          { year: 2004, vepHighestOffice: 60.7 },
          { year: 2006, vepHighestOffice: 41.3 },
          { year: 2008, vepHighestOffice: 62.2 },
          { year: 2010, vepHighestOffice: 41.8 },
          { year: 2012, vepHighestOffice: 58.6 },
          { year: 2014, vepHighestOffice: 36.7 },
          { year: 2016, vepHighestOffice: 60.1 },
          { year: 2018, vepHighestOffice: 50.0 },
          { year: 2020, vepHighestOffice: 66.6 }
      ];

      if (filterType === 'election') {
          data = data.filter(d => d.year % 4 === 0);
      } else if (filterType === 'non-election') {
          data = data.filter(d => d.year % 4 !== 0);
      }

      const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map(d => d.year));

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, 70]);

      // Create a tooltip
      const tooltip = d3.select("#left-box").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "white")
          .style("border", "1px solid #ccc")
          .style("padding", "10px")
          .style("pointer-events", "none");

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.year))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d.vepHighestOffice))
          .attr("height", d => height - y(d.vepHighestOffice))
          .attr("fill", "green")
          .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "orange");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html("VEP Highest Office: " + d.vepHighestOffice + "%")
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).attr("fill", "green");
              tooltip.transition().duration(500).style("opacity", 0);
          });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).tickFormat(d => d + "%"));

      // X axis label
      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Year");

      // Y axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10) 
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Voter Turnout (%)");
  }
};
