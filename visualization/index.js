/**
 * Main entry point -- this file has been added to index.html in a <script> tag. Add whatever code you want below.
 */
"use strict";
var margin = {top: 25, right: 70, bottom: 70, left: 70, axis: 10},
    width = 750 - margin.left - margin.right - margin.axis,
    height = 750 - margin.top - margin.bottom;

var datafilename = "../processed_data/analyzed_data.csv"
var emaildata = [];

// Read the file, turn it into the emaildata obj
function readData() {
    d3.csv(datafilename, function(data) {
        emaildata = data;
    });
}
readData(); // This runs automatically without any trigger

// Populate the dropdown with the potential senders. 
window.addEventListener("load", populateDropdown);
function populateDropdown() {
    var senders = emaildata.map(d => d.sender);
    var uniqueSenders = senders.filter((v, i, a) => a.indexOf(v) === i);

    var dropdownselect = d3.select("select");

    // Create dropdown. 
    dropdownselect.selectAll("option")
        .data(uniqueSenders)
        .enter()
        .append("option")
        .text(d => d)
    
    dropdownselect
        // Default entry
        .attr("selected", function(d) { 
            update(uniqueSenders[0]);
            return uniqueSenders[0];
        })
        // Update the graph when the dropdown is changed.
        .on("change", function() {
            var selectedSender = d3.select(this).property("value");
            update(selectedSender);
        });
}

function getQuartiles(data) {
    var returnme = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.topic;})
    .rollup(function(d) {
        var q1 = d3.quantile(d.map(function(g) { return parseInt(g.replyspeed)/60;}).sort(d3.ascending),.25)
        var median = d3.quantile(d.map(function(g) { return parseInt(g.replyspeed)/60;}).sort(d3.ascending),.5)
        var q3 = d3.quantile(d.map(function(g) { return parseInt(g.replyspeed)/60;}).sort(d3.ascending),.75)
        var interQuantileRange = q3 - q1
        var min = Math.max(q1 - 1.5*interQuantileRange, 0)
        var max = q3 + 1.5*interQuantileRange
        // console.log(q1, median, q3, interQuantileRange, min, max)
        // console.log(d.map(function(g) { return parseInt(g.time_elapsed);}).sort(d3.ascending))
        // console.log(q1, median, q3, interQuantileRange, min, max)
        return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(data);
    return returnme;
}

// what to do with update:
function update(selectedSender) {
    var data = emaildata;
    console.log("Selected sender: ", selectedSender); 

    // Filter the data based on the selected sender.
    var dataFiltered = data.filter(d => d.sender === selectedSender)

    // clear the div
    d3.select("#my_dataviz").selectAll("*").remove();

    // Deal with too few emails. 
    if (dataFiltered.length <= 20) {
        d3.select("#my_dataviz")
            .append("p")
            .text("Not enough data for " + selectedSender + ".");
        return; // DO NOT MAKE MORE VIZ. 
    }


    // Create the new SVG.
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
    var sumstat = getQuartiles(dataFiltered);

    // Show the Y scale
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(data.map(d => d.topic))
        .padding(.4);
    svg.append("g")
        .call(d3.axisLeft(y).ticks(0))
        .select(".domain").remove()

    // Show the X scale
    var x = d3.scaleLinear()
        .domain([0, d3.max(dataFiltered, d => parseInt(d.replyspeed)/60)])
        .range([0, width])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain").remove()

    // Color scale
    // var myColor = d3.scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([d3.min(data, d => parseInt(d.time_elapsed)), d3.max(data, d => parseInt(d.time_elapsed))])
    var myColor = d3.scaleOrdinal().domain(dataFiltered, d => d.recipient).range(d3.schemeSet3);

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .attr("y", height + margin.top + 30)
        .text("Time Till Reply (seconds)");

    // Add Y axis label:
    svg.append("text")
        .attr("y", -60)
        .attr("transform", `translate(${10} ${height/2}) rotate(-90)`)
        .text("Email Topics");

    // Show the main horizontal line
    svg.selectAll("horiLines")
        .data(sumstat)
        .enter()
        .append("line")
            .attr("x1", function(d){return(x(d.value.min))})
            .attr("x2", function(d){return(x(d.value.max))})
            .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
            .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
            .attr("stroke", "black")
            .style("width", 40)

    // rectangle for the main box
    svg.selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
            .attr("x", function(d){return(x(d.value.q1))})
            .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))})
            .attr("y", function(d) { return y(d.key); })
            .attr("height", y.bandwidth() )
            .attr("stroke", "black")
            .style("fill", "#69b3a2")
            .style("opacity", 0.3)

    // Show the median
    svg.selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
            .attr("y1", function(d){return(y(d.key))})
            .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
            .attr("x1", function(d){return(x(d.value.median))})
            .attr("x2", function(d){return(x(d.value.median))})
            .attr("stroke", "black")
            .style("width", 80)

    // create a tooltip
    var tooltip = d3.select("#my_dataviz")
                    .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("font-size", "16px")
        
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
    tooltip
        .html("<span style='color:grey'>Time Elapsed: </span>" + (d.replyspeed/60)) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var mousemove = function(d) {
    tooltip
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var mouseleave = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    // Add individual points with jitter
    var radius = 50
    svg
    .selectAll("indPoints")
    .data(dataFiltered)
    .enter()
    .append("circle")
        .attr("cx", function(d){ return(x(d.replyspeed/60))})
        .attr("cy", function(d){ return( y(d.topic) + (y.bandwidth()/2) - radius/2 + Math.random()*radius )})
        .attr("r", 4)
        .style("fill", function(d) { return(myColor(d.recipient)) }) //@trisha - needs to be recipient?
        .attr("stroke", "black")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
}