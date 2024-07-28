const Introduction = {
    title: "Introduction",
    description: "Use the buttons below to view different representations of the current chart.",
    chart: function() {
        const margin = { top: 20, right: 20, bottom: 50, left: 80 },
              width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
              height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;
  
        const svg = d3.select("#left-box").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        svg.append("foreignObject")
          .attr("width", width)
          .attr("height", height)
          .append("xhtml:div")
          .style("font", "16px 'Arial'")
          .style("border", "1px solid transparent")
          .style("padding", "10px")
          .style("box-sizing", "border-box")
          .html("<p>This narrative visualization investigates the effects of different factors on voter turnout.</p>" +
            "Use the buttons at the bottom of the screen to navigate to the next chart.</p>" +
            "All charts have details that can be viewed by hovering over a specific data point. " +
            "<p>Sources:</p>" +
            "<b><a href='https://www.electproject.org/2022g' target='_blank'>https://www.electproject.org/2022g</a></b><br>" +
            "<b><a href='https://www.opensecrets.org/elections-overview/cost-of-election?display=P' target='_blank'>https://www.opensecrets.org/elections-overview/cost-of-election?display=P</a></b><br>" +
            "<b><a href='https://www.census.gov/data/tables/time-series/demo/voting-and-registration/voting-historical-time-series.html' target='_blank'>https://www.census.gov/data/tables/time-series/demo/voting-and-registration/voting-historical-time-series.html</a></b><br>" +
            "<b><a href='https://www.census.gov/data/tables/time-series/demo/voting-and-registration/p20-585.html' target='_blank'>https://www.census.gov/data/tables/time-series/demo/voting-and-registration/p20-585.html</a></b><br>"
       );
    }
  };
  