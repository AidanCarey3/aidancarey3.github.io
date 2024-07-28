const Page5 = {
  title: "Voter Turnout by Age",
  description: "This chart compares voter turnout to each age in 2020. Age is positively correlated with voter turnout until 78.",
  filterLabel: "",
  chart: function(filtered = false) {
      const margin = { top: 20, right: 20, bottom: 50, left: 80 },
            width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
            height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;

      const svg = d3.select("#left-box").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const data = [
          { age: 18, population: 3926, reportedVoted: 40.1, reportedRegistered: 45.6 },
          { age: 19, population: 3808, reportedVoted: 46.8, reportedRegistered: 54.0 },
          { age: 20, population: 4575, reportedVoted: 49.0, reportedRegistered: 57.4 },
          { age: 21, population: 4178, reportedVoted: 46.0, reportedRegistered: 54.9 },
          { age: 22, population: 4017, reportedVoted: 50.7, reportedRegistered: 60.7 },
          { age: 23, population: 3961, reportedVoted: 52.7, reportedRegistered: 60.5 },
          { age: 24, population: 4194, reportedVoted: 50.3, reportedRegistered: 56.9 },
          { age: 25, population: 4055, reportedVoted: 49.9, reportedRegistered: 57.7 },
          { age: 26, population: 4260, reportedVoted: 49.0, reportedRegistered: 56.3 },
          { age: 27, population: 4736, reportedVoted: 54.4, reportedRegistered: 62.5 },
          { age: 28, population: 4518, reportedVoted: 51.9, reportedRegistered: 60.5 },
          { age: 29, population: 4869, reportedVoted: 54.9, reportedRegistered: 61.4 },
          { age: 30, population: 4736, reportedVoted: 53.3, reportedRegistered: 61.0 },
          { age: 31, population: 4621, reportedVoted: 54.3, reportedRegistered: 61.6 },
          { age: 32, population: 4324, reportedVoted: 59.0, reportedRegistered: 65.0 },
          { age: 33, population: 4385, reportedVoted: 54.9, reportedRegistered: 61.0 },
          { age: 34, population: 4367, reportedVoted: 55.0, reportedRegistered: 62.2 },
          { age: 35, population: 4505, reportedVoted: 54.7, reportedRegistered: 61.6 },
          { age: 36, population: 4589, reportedVoted: 55.3, reportedRegistered: 61.7 },
          { age: 37, population: 3994, reportedVoted: 55.7, reportedRegistered: 60.6 },
          { age: 38, population: 4408, reportedVoted: 58.9, reportedRegistered: 65.8 },
          { age: 39, population: 3923, reportedVoted: 57.9, reportedRegistered: 64.3 },
          { age: 40, population: 4299, reportedVoted: 55.4, reportedRegistered: 60.6 },
          { age: 41, population: 3952, reportedVoted: 55.8, reportedRegistered: 61.2 },
          { age: 42, population: 4024, reportedVoted: 57.0, reportedRegistered: 61.9 },
          { age: 43, population: 3904, reportedVoted: 57.7, reportedRegistered: 62.6 },
          { age: 44, population: 3960, reportedVoted: 55.5, reportedRegistered: 61.7 },
          { age: 45, population: 4022, reportedVoted: 58.3, reportedRegistered: 62.7 },
          { age: 46, population: 3815, reportedVoted: 60.5, reportedRegistered: 65.9 },
          { age: 47, population: 3789, reportedVoted: 60.0, reportedRegistered: 65.8 },
          { age: 48, population: 3922, reportedVoted: 60.9, reportedRegistered: 66.4 },
          { age: 49, population: 3963, reportedVoted: 62.4, reportedRegistered: 66.4 },
          { age: 50, population: 4197, reportedVoted: 64.2, reportedRegistered: 67.8 },
          { age: 51, population: 4262, reportedVoted: 62.2, reportedRegistered: 68.0 },
          { age: 52, population: 4000, reportedVoted: 65.2, reportedRegistered: 69.5 },
          { age: 53, population: 3974, reportedVoted: 65.3, reportedRegistered: 70.4 },
          { age: 54, population: 3814, reportedVoted: 64.3, reportedRegistered: 69.0 },
          { age: 55, population: 4485, reportedVoted: 64.6, reportedRegistered: 68.6 },
          { age: 56, population: 4077, reportedVoted: 65.7, reportedRegistered: 70.0 },
          { age: 57, population: 3995, reportedVoted: 68.7, reportedRegistered: 73.8 },
          { age: 58, population: 4208, reportedVoted: 66.1, reportedRegistered: 70.4 },
          { age: 59, population: 4254, reportedVoted: 68.7, reportedRegistered: 73.2 },
          { age: 60, population: 4522, reportedVoted: 68.8, reportedRegistered: 71.9 },
          { age: 61, population: 4360, reportedVoted: 66.3, reportedRegistered: 69.8 },
          { age: 62, population: 4028, reportedVoted: 70.7, reportedRegistered: 74.9 },
          { age: 63, population: 4078, reportedVoted: 74.3, reportedRegistered: 77.5 },
          { age: 64, population: 4148, reportedVoted: 71.0, reportedRegistered: 74.4 },
          { age: 65, population: 3993, reportedVoted: 71.1, reportedRegistered: 73.8 },
          { age: 66, population: 3744, reportedVoted: 73.0, reportedRegistered: 76.1 },
          { age: 67, population: 3600, reportedVoted: 72.3, reportedRegistered: 75.4 },
          { age: 68, population: 3436, reportedVoted: 72.2, reportedRegistered: 74.8 },
          { age: 69, population: 3286, reportedVoted: 74.0, reportedRegistered: 77.0 },
          { age: 70, population: 3180, reportedVoted: 70.5, reportedRegistered: 72.9 },
          { age: 71, population: 2989, reportedVoted: 73.0, reportedRegistered: 75.7 },
          { age: 72, population: 3176, reportedVoted: 75.4, reportedRegistered: 78.3 },
          { age: 73, population: 2951, reportedVoted: 76.3, reportedRegistered: 80.3 },
          { age: 74, population: 2599, reportedVoted: 72.9, reportedRegistered: 76.1 },
          { age: 75, population: 2248, reportedVoted: 75.7, reportedRegistered: 79.2 },
          { age: 76, population: 2129, reportedVoted: 75.4, reportedRegistered: 79.2 },
          { age: 77, population: 1944, reportedVoted: 75.1, reportedRegistered: 78.3 },
          { age: 78, population: 1937, reportedVoted: 77.7, reportedRegistered: 81.3 },
          { age: 79, population: 1622, reportedVoted: 72.8, reportedRegistered: 77.2 },
          { age: 80, population: 6554, reportedVoted: 70.1, reportedRegistered: 75.6 },
          { age: 85, population: 5886, reportedVoted: 61.5, reportedRegistered: 69.6 }
      ];

      const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map(d => d.age));

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, d => d.reportedVoted)]);

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
          .attr("x", d => x(d.age))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d.reportedVoted))
          .attr("height", d => height - y(d.reportedVoted))
          .attr("fill", "steelblue")
          .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "orange");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html("Age: " + d.age + "<br/>Total Population (Thousands): " + d.population.toLocaleString() + "<br/>Reported Voted: " + d.reportedVoted + "%<br/>Reported Registered: " + d.reportedRegistered + "%")
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).attr("fill", "steelblue");
              tooltip.transition().duration(500).style("opacity", 0);
          });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(data.filter((d, i) => i % 5 === 0).map(d => d.age))); // Spread out the ticks

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).tickFormat(d => d + "%"));

      // X axis label
      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Age");

      // Y axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Voter Turnout (%)");

      const annotationText1 = `
          18 to 19 is the largest single age difference, increasing by 6.7%.</b> This chart groups 80-84 and 85+. 
      `;

     
      const annotationX = x(23);
      const annotationY = y(75);
      
      svg.append("foreignObject")
          .attr("x", annotationX) 
          .attr("y", annotationY)
          .attr("width", 200) 
          .attr("height", 150) 
          .append("xhtml:div")
          .style("font", "12px 'Arial'")
          .style("border", "1px solid black")
          .style("background-color", "rgba(255, 255, 255, 0.5)")
          .style("padding", "10px")
          .style("box-sizing", "border-box") 
          .html(annotationText1);
  }
};
