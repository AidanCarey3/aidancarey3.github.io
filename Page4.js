const Page4 = {
  title: "Voter Turnout by Age Group",
  description: "This chart compares voter turnout to age groups in 2020. Age is positively correlated with voter turnout.",
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
          { ageGroup: "18 to 24 years", population: 28659, reportedVoted: 48.0, reportedRegistered: 55.8 },
          { ageGroup: "25 to 34 years", population: 44871, reportedVoted: 53.7, reportedRegistered: 61.0 },
          { ageGroup: "35 to 44 years", population: 41558, reportedVoted: 56.4, reportedRegistered: 62.2 },
          { ageGroup: "45 to 54 years", population: 39758, reportedVoted: 62.4, reportedRegistered: 67.2 },
          { ageGroup: "55 to 64 years", population: 42155, reportedVoted: 68.4, reportedRegistered: 72.4 },
          { ageGroup: "65 to 74 years", population: 32954, reportedVoted: 73.0, reportedRegistered: 75.9 },
          { ageGroup: "75 years and over", population: 22320, reportedVoted: 70.2, reportedRegistered: 75.6 }
      ];

      const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map(d => d.ageGroup));

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, 75]);

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
          .attr("x", d => x(d.ageGroup))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d.reportedVoted))
          .attr("height", d => height - y(d.reportedVoted))
          .attr("fill", "steelblue")
          .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "orange");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html("Age Group: " + d.ageGroup + "<br/>Total Population (Thousands): " + d.population.toLocaleString() + "<br/>Reported Voted: " + d.reportedVoted + "%<br/>Reported Registered: " + d.reportedRegistered + "%")
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
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).tickFormat(d => d + "%"));

      // X axis label
      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Age Group");

      // Y axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Voter Turnout (%)");

      const annotationText1 = `
          Voting percent increases between each age group, until the 75+ group.
      `;

      
      const annotationX = x("18 to 24 years");
      const annotationY = y(65);
      
      svg.append("foreignObject")
          .attr("x", annotationX)
          .attr("y", annotationY) 
          .attr("width", 250)
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
