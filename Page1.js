const Page1 = {
  title: "Voter Turnout vs Campaign Budget",
  description: "This chart compares voter turnout to the campaign budget. Spending is positively correlated with voter turnout.",
  filterLabel: "Years 2000, 2004, 2008, etc.",
  filter2Label: "Show Campaign Spending by Year",
  filter3Label: "Show VEP by Year",
  chart: function(filtered = false) {
      const margin = { top: 20, right: 20, bottom: 50, left: 80 },
            width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
            height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;

      const svg = d3.select("#left-box").append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
          .attr("preserveAspectRatio", "xMinYMin meet")
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const data = [
          { year: 2000, vepHighestOffice: 55.3, total: 5282978249 },
          { year: 2002, vepHighestOffice: 40.5, total: 3575820539 },
          { year: 2004, vepHighestOffice: 60.7, total: 6481862898 },
          { year: 2006, vepHighestOffice: 41.3, total: 4143571528 },
          { year: 2008, vepHighestOffice: 62.2, total: 7145447701 },
          { year: 2010, vepHighestOffice: 41.8, total: 4926926901 },
          { year: 2012, vepHighestOffice: 58.6, total: 8080586655 },
          { year: 2014, vepHighestOffice: 36.7, total: 4788245781 },
          { year: 2016, vepHighestOffice: 60.1, total: 8006799997 },
          { year: 2018, vepHighestOffice: 50.0, total: 6724800108 },
          { year: 2020, vepHighestOffice: 66.6, total: 16413031959 }
      ];

      const dataExcluding2020 = data.filter(d => d.year !== 2020);

      const x = d3.scaleLinear()
          .range([0, width])
          .domain([0, d3.max(data, d => d.total)])
          .nice();

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, 70]);

      const tooltip = d3.select("#left-box").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "white")
          .style("border", "1px solid #ccc")
          .style("padding", "10px")
          .style("pointer-events", "none");

      const regression = linearRegression(data);
      const regressionExcluding2020 = linearRegression(dataExcluding2020);

      const regressionLine = x.domain().map(d => ({ total: d, vepHighestOffice: regression.slope * d + regression.intercept }));
      const regressionLineExcluding2020 = x.domain().map(d => ({ total: d, vepHighestOffice: regressionExcluding2020.slope * d + regressionExcluding2020.intercept }));

      svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", d => x(d.total))
          .attr("cy", d => y(d.vepHighestOffice))
          .attr("r", 5)
          .attr("fill", "orange")
          .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "steelblue");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html("Year: " + d.year + "<br/>Voter Turnout: " + d.vepHighestOffice + "%<br/>" + "Campaign Budget: $" + d.total.toLocaleString())
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              d3.select(this).attr("fill", "orange");
              tooltip.transition().duration(500).style("opacity", 0);
          });

      const line = d3.line()
          .x(d => x(d.total))
          .y(d => y(d.vepHighestOffice));

      svg.append("path")
          .datum(regressionLine)
          .attr("class", "regression-line")
          .attr("d", line)
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("fill", "none");

      svg.append("path")
          .datum(regressionLineExcluding2020)
          .attr("class", "regression-line")
          .attr("d", line)
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("fill", "none");

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("$.2s")));

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).tickFormat(d => d + "%"));

      svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Campaign Budget ($B)");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Voter Turnout (%)");

      function linearRegression(data) {
          const n = data.length;
          const sumX = d3.sum(data, d => d.total);
          const sumY = d3.sum(data, d => d.vepHighestOffice);
          const sumXY = d3.sum(data, d => d.total * d.vepHighestOffice);
          const sumX2 = d3.sum(data, d => d.total * d.total);

          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;

          return { slope, intercept };
      }

      const annotationText1 = `
        From 2016 to 2020, the campaign budget approximately doubled while voter turnout increased by 6.5%.<br><br>
        Comparing the lines of best fit shows that there are diminishing returns to an increase in campaign budget. 
      `;
      const annotationX1 = x(12000000000);
      const annotationY1 = y(35);
      svg.append("foreignObject")
        .attr("x", annotationX1)
        .attr("y", annotationY1) 
        .attr("width", 250) 
        .attr("height", 200) 
        .append("xhtml:div")
        .style("font", "14px 'Arial'")
        .style("border", "1px solid black")
        .style("background-color", "white")
        .style("padding", "10px")
        .style("box-sizing", "border-box") 
        .html(annotationText1);
      
        const annotationX2 = x(4000000000);
        const annotationY2 = y(20);
      const annotationText2 = `
        The black line shows the line of best fit with all the data. <br>
        The red line shows the line of best fit excluding 2020. 
      `;

      svg.append("foreignObject")
        .attr("x", annotationX2)
        .attr("y", annotationY2) 
        .attr("width", 250)
        .attr("height", 120)
        .append("xhtml:div")
        .style("font", "14px 'Arial'")
        .style("border", "1px solid black")
        .style("background-color", "white")
        .style("padding", "10px")
        .style("box-sizing", "border-box") 
        .html(annotationText2);
  }
};
