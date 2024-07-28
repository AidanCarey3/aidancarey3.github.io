document.addEventListener("DOMContentLoaded", function() {
    d3.select("#title")
        .style("width", "100%")
        .style("text-align", "center");

    d3.select("#left-box")
        .style("height", "100%");

    d3.select("#right-box")
        .style("height", "50%");

    // Load the Introduction page by default
    loadPage(Introduction);
    setActiveButton(document.getElementById('introduction-btn'));

    document.getElementById('page1-btn').addEventListener('click', function() {
        setActiveButton(this);
        loadPage(Page1);
    });

    document.getElementById('page4-btn').addEventListener('click', function() {
        setActiveButton(this);
        loadPage(Page4);
    });

    document.getElementById('page6-btn').addEventListener('click', function() {
        setActiveButton(this);
        loadPage(Page6);
    });

    document.getElementById('introduction-btn').addEventListener('click', function() {
        setActiveButton(this);
        loadPage(Introduction);
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
            } else if (currentPageTitle === 'Voter Turnout by Year') {
                currentPage = Page3;
            } else if (currentPageTitle === 'Voter Turnout by Age Group') {
                currentPage = Page4;
            } else if (currentPageTitle === 'Voter Turnout by Age') {
                currentPage = Page5;
            } else if (currentPageTitle === 'Voter Turnout by Ethnicity') {
                currentPage = Page6;
            } else if (currentPageTitle === 'Introduction') {
                currentPage = Introduction;
            }

            if (filterType === 'Show Default') {
                loadPage(currentPage);
            } else if (filterType === 'Show Election Years Only') {
                loadPage(currentPage, true, 'election');
            } else if (filterType === 'Show Non-Election Years Only') {
                loadPage(currentPage, true, 'non-election');
            } else if (filterType === 'Show White Only') {
                loadPage(currentPage, true, 'white');
            } else if (filterType === 'Show Black Only') {
                loadPage(currentPage, true, 'black');
            } else if (filterType === 'Show Asian Only') {
                loadPage(currentPage, true, 'asian');
            } else if (filterType === 'Show Hispanic Only') {
                loadPage(currentPage, true, 'hispanic');
            } else if (filterType === 'Show Campaign Spending by Year') {
                loadPage(Page2);
            } else if (filterType === 'Show Voter Turnout by Year') {
                loadPage(Page3);
            } else if (filterType === 'Show Each Individual Age') {
                loadPage(Page5);
            } else if (filterType === 'Return to Age Groups') {
                loadPage(Page4);
            } else if (filterType === 'Return to Voter Turnout vs Campaign Budget') {
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
        } else if (currentPageTitle === 'Voter Turnout by Year') {
            currentPage = Page3;
        } else if (currentPageTitle === 'Voter Turnout by Age Group') {
            currentPage = Page4;
        } else if (currentPageTitle === 'Voter Turnout by Age') {
            currentPage = Page5;
        } else if (currentPageTitle === 'Voter Turnout by Ethnicity') {
            currentPage = Page6;
        } else if (currentPageTitle === 'Introduction') {
            currentPage = Introduction;
        }

        loadPage(currentPage);
    });
});

function setActiveButton(button) {
    document.querySelectorAll('#buttons button').forEach(function(btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function loadPage(page, filtered = false, filterType = 'default') {
    d3.select("#title").text(page.title);
    d3.select("#right-textbox").text(page.description);
    d3.select("#left-box").selectAll("*").remove();
    page.chart(filtered, filterType);

    let filterLabels = [];
    if (page.filter2Label && !filterLabels.includes(page.filter2Label)) filterLabels.push(page.filter2Label);
    if (page.filter3Label && !filterLabels.includes(page.filter3Label)) filterLabels.push(page.filter3Label);
    if (page.filter4Label && !filterLabels.includes(page.filter4Label)) filterLabels.push(page.filter4Label);
    if (page.filter5Label && !filterLabels.includes(page.filter5Label)) filterLabels.push(page.filter5Label);

    if (page.title === 'Voter Turnout vs Campaign Budget') {
        filterLabels = ['Show Campaign Spending by Year', 'Show Voter Turnout by Year'];
    } else if (page.title === 'Campaign Spending by Year') {
        filterLabels = ['Show Default', 'Show Election Years Only', 'Show Non-Election Years Only', 'Return to Voter Turnout vs Campaign Budget'];
    } else if (page.title === 'Voter Turnout by Year') {
        filterLabels = ['Show Default', 'Show Election Years Only', 'Show Non-Election Years Only', 'Return to Voter Turnout vs Campaign Budget'];
    } else if (page.title === 'Voter Turnout by Age Group') {
        filterLabels = ['Show Each Individual Age'];
    } else if (page.title === 'Voter Turnout by Age') {
        filterLabels = ['Return to Age Groups'];
    } else if (page.title === 'Voter Turnout by Ethnicity') {
        filterLabels = ['Show Default', 'Show White Only', 'Show Black Only', 'Show Asian Only', 'Show Hispanic Only'];
    } else if (page.title === 'Introduction') {
        filterLabels = ['Sample Button'];
    } else {
        filterLabels = ['Show Default', 'Return to Voter Turnout vs Campaign Budget'];
    }

    const buttons = d3.select("#right-buttons").selectAll("button")
        .data(filterLabels);

    buttons.enter()
        .append("button")
        .merge(buttons)
        .text(d => d);

    buttons.exit().remove();
}
