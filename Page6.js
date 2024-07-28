const Page6 = {
    title: "Voter Turnout by Ethnicity",
    description: "This chart shows the voter turnout by ethnicity for each year from 2000 to 2020.",
    filter2Label: "White",
    filter3Label: "Black",
    filter4Label: "Asian",
    filter5Label: "Hispanic",
    chart: function(filtered = false, filterType = 'default') {
        const margin = { top: 20, right: 20, bottom: 50, left: 80 },
              width = document.getElementById('left-box').offsetWidth - margin.left - margin.right,
              height = document.getElementById('left-box').offsetHeight - margin.top - margin.bottom;

        const svg = d3.select("#left-box").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const data = [
            { year: 2000, white: 61.8, black: 56.8, asian: 43.3, hispanic: 45.1 },
            { year: 2002, white: 49.1, black: 42.3, asian: 31.2, hispanic: 30.4 },
            { year: 2004, white: 67.2, black: 60.0, asian: 44.2, hispanic: 47.2 },
            { year: 2006, white: 51.6, black: 41.0, asian: 32.4, hispanic: 32.3 },
            { year: 2008, white: 66.1, black: 64.7, asian: 47.6, hispanic: 49.9 },
            { year: 2010, white: 48.6, black: 43.5, asian: 30.8, hispanic: 31.2 },
            { year: 2012, white: 64.1, black: 66.2, asian: 47.3, hispanic: 48.0 },
            { year: 2014, white: 45.8, black: 39.7, asian: 27.1, hispanic: 27.0 },
            { year: 2016, white: 65.3, black: 59.4, asian: 49.0, hispanic: 47.6 },
            { year: 2018, white: 57.5, black: 51.1, asian: 40.6, hispanic: 40.4 },
            { year: 2020, white: 70.9, black: 62.6, asian: 59.7, hispanic: 53.7 }
        ];

        const combinedData = [
            { year: 2000, totalVotingAgePopulation: 202609 * 1000, totalCitizenPopulationPercent: 59.5 },
            { year: 2002, totalVotingAgePopulation: 210421 * 1000, totalCitizenPopulationPercent: 46.1 },
            { year: 2004, totalVotingAgePopulation: 215694 * 1000, totalCitizenPopulationPercent: 63.8 },
            { year: 2006, totalVotingAgePopulation: 220603 * 1000, totalCitizenPopulationPercent: 47.8 },
            { year: 2008, totalVotingAgePopulation: 225499 * 1000, totalCitizenPopulationPercent: 63.6 },
            { year: 2010, totalVotingAgePopulation: 229690 * 1000, totalCitizenPopulationPercent: 45.5 },
            { year: 2012, totalVotingAgePopulation: 235248 * 1000, totalCitizenPopulationPercent: 61.8 },
            { year: 2014, totalVotingAgePopulation: 239874 * 1000, totalCitizenPopulationPercent: 41.9 },
            { year: 2016, totalVotingAgePopulation: 245502 * 1000, totalCitizenPopulationPercent: 61.4 },
            { year: 2018, totalVotingAgePopulation: 249748 * 1000, totalCitizenPopulationPercent: 53.4 },
            { year: 2020, totalVotingAgePopulation: 252274 * 1000, totalCitizenPopulationPercent: 66.8 }
        ];

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

        const colors = { white: "orange", black: "steelblue", asian: "green", hispanic: "red" };
        const categories = ["white", "black", "asian", "hispanic"];
        const categoryLabels = { white: "White", black: "Black", asian: "Asian", hispanic: "Hispanic" };

        if (filtered) {
            svg.selectAll(`.bar.${filterType}`)
              .data(data)
              .enter().append("rect")
                .attr("class", `bar ${filterType}`)
                .attr("x", d => x(d.year))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d[filterType]))
                .attr("height", d => height - y(d[filterType]))
                .attr("fill", colors[filterType])
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("fill", "orange");
                    tooltip.transition().duration(200).style("opacity", .9);
                    tooltip.html(`Year: ${d.year}<br/>${categoryLabels[filterType]}: ${d[filterType]}%`)
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    d3.select(this).attr("fill", colors[filterType]);
                    tooltip.transition().duration(500).style("opacity", 0);
                });
        } else {
            categories.forEach((category) => {
                svg.selectAll(`.bar.${category}`)
                  .data(data)
                  .enter().append("rect")
                    .attr("class", `bar ${category}`)
                    .attr("x", d => x(d.year) + (x.bandwidth() / categories.length) * categories.indexOf(category))
                    .attr("width", x.bandwidth() / categories.length)
                    .attr("y", d => y(d[category]))
                    .attr("height", d => height - y(d[category]))
                    .attr("fill", colors[category])
                    .on("mouseover", function(event, d) {
                        d3.select(this).attr("fill", "orange");
                        tooltip.transition().duration(200).style("opacity", .9);

                        let combinedDatum = combinedData.find(cd => cd.year === d.year);
                        let combinedText = combinedDatum 
                        ? `<br/>Total Voting Age Population: ${combinedDatum.totalVotingAgePopulation}<br/>Total Voter Turnout Percent: ${combinedDatum.totalCitizenPopulationPercent}%`
                        : '';
                        tooltip.html(`Year: ${d.year}<br/>${categoryLabels[category]}: ${d[category]}%${combinedText}`)
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).attr("fill", colors[category]);
                        tooltip.transition().duration(500).style("opacity", 0);
                    });
            });
        }

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

        let annotationText = "From 2000 to 2020, voter turnout has increased among all groups, albeit at different rates.";
        if (filtered) {
            switch (filterType) {
                case "white":
                    annotationText = "White people have had the highest voter turnout every year except 2012.";
                    break;
                case "black":
                    annotationText = "2012, when Obama was re-elected, was the only year where Blacks had the highest voter turnout.";
                    break;
                case "asian":
                    annotationText = "The Asian demographic had by far the biggest increase from 2000 to 2020 at 16.4%.";
                    break;
                case "hispanic":
                    annotationText = "The Hispanic demographic had the smallest increase from 2000 to 2020 at 8.6%.";
                    break;
            }
        }

        const annotationX = (x(2002) + x(2000)) / 2;
      const annotationY = y(65);
       
        svg.append("foreignObject")
            .attr("x", annotationX) 
            .attr("y", annotationY) 
            .attr("width", 100) 
            .attr("height", 100) 
            .append("xhtml:div")
            .style("font", "10px 'Arial'")
            .style("border", "1px solid black")
            .style("background-color", "rgba(255, 255, 255, 0.5)")
            .style("padding", "10px")
            .style("box-sizing", "border-box") 
            .html(annotationText);

            // legend
        const legend = svg.selectAll(".legend")
        .data(categories)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${(width / 2) + (i * 60) + 70}, ${height + margin.bottom - 20})`);

        legend.append("rect")
        .attr("x", 0)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", d => colors[d]);

        legend.append("text")
        .attr("x", 18)
        .attr("y", 6)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", "12px")
        .text(d => categoryLabels[d]);

    }
};

// Updated JavaScript file to include Page6 filter buttons
document.addEventListener("DOMContentLoaded", function() {
    d3.select("#title")
        .style("width", "100%")
        .style("text-align", "center");

    d3.select("#left-box")
        .style("height", "100%");

    d3.select("#right-box")
        .style("height", "50%");

    loadPage(Page1);

    document.getElementById('page1-btn').addEventListener('click', function() {
        loadPage(Page1);
    });

    document.getElementById('page2-btn').addEventListener('click', function() {
        loadPage(Page2);
    });

    document.getElementById('page3-btn').addEventListener('click', function() {
        loadPage(Page3);
    });

    document.getElementById('page4-btn').addEventListener('click', function() {
        loadPage(Page4);
    });

    document.getElementById('page5-btn').addEventListener('click', function() {
        loadPage(Page5);
    });

    document.getElementById('page6-btn').addEventListener('click', function() {
        loadPage(Page6);
    });

    document.getElementById('right-buttons').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const filterType = event.target.innerText;
            const currentPageTitle = document.getElementById('title').innerText;
            let currentPage;

            if (currentPageTitle === 'Campaign Spending by Year') {
                currentPage = Page2;
            } else if (currentPageTitle === 'Voter Turnout vs Campaign Budget (Scatterplot)') {
                currentPage = Page1;
            } else if (currentPageTitle === 'VEP Highest Office by Year') {
                currentPage = Page3;
            } else if (currentPageTitle === 'Reported Voting Percent by Age Group') {
                currentPage = Page4;
            } else if (currentPageTitle === 'Reported Voting Percent by Age') {
                currentPage = Page5;
            } else if (currentPageTitle === 'Voter Turnout by Ethnicity') {
                currentPage = Page6;
            }

            if (filterType === 'Default') {
                loadPage(currentPage);
            } else if (filterType === currentPage.filter2Label) {
                loadPage(currentPage, true, 'white');
            } else if (filterType === currentPage.filter3Label) {
                loadPage(currentPage, true, 'black');
            } else if (filterType === currentPage.filter4Label) {
                loadPage(currentPage, true, 'asian');
            } else if (filterType === currentPage.filter5Label) {
                loadPage(currentPage, true, 'hispanic');
            } else if (filterType === 'Go to Page 1') {
                loadPage(Page1);
            }
        }
    });

    window.addEventListener('resize', function() {
        const currentPageTitle = document.getElementById('title').innerText;
        let currentPage;

        if (currentPageTitle === 'Campaign Spending by Year') {
            currentPage = Page2;
        } else if (currentPageTitle === 'Voter Turnout vs Campaign Budget (Scatterplot)') {
            currentPage = Page1;
        } else if (currentPageTitle === 'VEP Highest Office by Year') {
            currentPage = Page3;
        } else if (currentPageTitle === 'Reported Voting Percent by Age Group') {
            currentPage = Page4;
        } else if (currentPageTitle === 'Reported Voting Percent by Age') {
            currentPage = Page5;
        } else if (currentPageTitle === 'Voter Turnout by Ethnicity') {
            currentPage = Page6;
        }

        loadPage(currentPage);
    });


});

function loadPage(page, filtered = false, filterType = 'default') {
    d3.select("#title").text(page.title);
    d3.select("#right-textbox").text(page.description);
    d3.select("#left-box").selectAll("*").remove();
    page.chart(filtered, filterType);

    let filterLabels = [];
    if (page.filter2Label) filterLabels.push(page.filter2Label);
    if (page.filter3Label) filterLabels.push(page.filter3Label);
    if (page.filter4Label) filterLabels.push(page.filter4Label);
    if (page.filter5Label) filterLabels.push(page.filter5Label);

    if (page.title === 'Voter Turnout vs Campaign Budget (Scatterplot)') {
        filterLabels.push('Go to Page 2');
        filterLabels.push('Go to Page 3');
    } else if (page.title === 'Voter Turnout by Ethnicity') {
        filterLabels.unshift('Default');
        filterLabels.push('Go to Page 1');
    } else {
        filterLabels.unshift('Default');
        filterLabels.push('Go to Page 1');
    }

    const buttons = d3.select("#right-buttons").selectAll("button")
        .data(filterLabels);

    buttons.enter()
        .append("button")
        .merge(buttons)
        .text(d => d);

    buttons.exit().remove();
}
