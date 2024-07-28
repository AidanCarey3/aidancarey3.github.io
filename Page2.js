const Page2 = {
  title: "Campaign Spending by Year",
  description: "This chart shows the total campaign spending for each year from 2000 to 2020.",
  filter2Label: "Default",
  filter3Label: "Election Years Only",
  filter4Label: "Non-Election Years Only",
  chart: function(filtered = false, filterType = 'default') {
      const margin = { top: 20, right: 20, bottom: 50, left: 80 }, 
            width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
            height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;

      const svg = d3.select("#left-box").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

      // Sample data
      let data = [
          { year: 2000, total: 5282978249 },
          { year: 2002, total: 3575820539 },
          { year: 2004, total: 6481862898 },
          { year: 2006, total: 4143571528 },
          { year: 2008, total: 7145447701 },
          { year: 2010, total: 4926926901 },
          { year: 2012, total: 8080586655 },
          { year: 2014, total: 4788245781 },
          { year: 2016, total: 8006799997 },
          { year: 2018, total: 6724800108 },
          { year: 2020, total: 16413031959 }
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
          .domain([0, d3.max(data, d => d.total)])
          .nice();

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
          .attr("y", d => y(d.total))
          .attr("height", d => height - y(d.total))
          .attr("fill", "steelblue")
          .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "orange");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html("Total: $" + d.total.toLocaleString())
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
        .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("$.2s")));

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
        .text("Total Campaign Spending ($B)");

        const annotationText1 = `
        From 2000 to 2016, the campaign spending from each election year (or non-election year) to the next increased steadily.<br> <br>
        In 2018 and especially 2020, however, the campaign spending jumped drastically. 
      `;
      
      const annotationX1 = x(2004);
        const annotationY1 = y(14000000000);
      svg.append("foreignObject")
        .attr("x", annotationX1) 
        .attr("y", annotationY1)
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
