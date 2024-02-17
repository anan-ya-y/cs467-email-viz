/**
 * Main entry point -- this file has been added to index.html in a <script> tag. Add whatever code you want below.
 */
"use strict";

const data = [
    {sender: "bill",    folder: "personal", time_elapsed: 30},
    {sender: "tom",    folder: "inbox", time_elapsed: 74},
    {sender: "jane",    folder: "personal", time_elapsed: 134234},
    {sender: "harry",    folder: "inbox", time_elapsed: 14},
    {sender: "mary",    folder: "personal", time_elapsed: 100},
    {sender: "sally",    folder: "inbox", time_elapsed: 87},
    {sender: "jake",    folder: "personal", time_elapsed: 234},
    {sender: "jack",    folder: "inbox", time_elapsed: 124},
    {sender: "jill",    folder: "personal", time_elapsed: 887},
    {sender: "ron",    folder: "inbox", time_elapsed: 2389},
    {sender: "john",    folder: "personal", time_elapsed: 1403},
    {sender: "ben",    folder: "inbox", time_elapsed: 10}
];

// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 50, left: 70},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Read the data and compute summary statistics for each specie
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {

//   // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
//   var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
//     .key(function(d) { return d.Species;})
//     .rollup(function(d) {
//       q1 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.25)
//       median = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.5)
//       q3 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.75)
//       interQuantileRange = q3 - q1
//       min = q1 - 1.5 * interQuantileRange
//       max = q3 + 1.5 * interQuantileRange
//       return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
//     })
//     .entries(data)

//   // Show the Y scale
//   var y = d3.scaleBand()
//     .range([ height, 0 ])
//     .domain(["setosa", "versicolor", "virginica"])
//     .padding(.4);
//   svg.append("g")
//     .call(d3.axisLeft(y).tickSize(0))
//     .select(".domain").remove()

//   // Show the X scale
//   var x = d3.scaleLinear()
//     .domain([4,8])
//     .range([0, width])
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).ticks(5))
//     .select(".domain").remove()

//   // Color scale
//   var myColor = d3.scaleSequential()
//     .interpolator(d3.interpolateInferno)
//     .domain([4,8])

//   // Add X axis label:
//   svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", width)
//       .attr("y", height + margin.top + 30)
//       .text("Sepal Length");

//   // Show the main vertical line
//   svg
//     .selectAll("vertLines")
//     .data(sumstat)
//     .enter()
//     .append("line")
//       .attr("x1", function(d){return(x(d.value.min))})
//       .attr("x2", function(d){return(x(d.value.max))})
//       .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
//       .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
//       .attr("stroke", "black")
//       .style("width", 40)

//   // rectangle for the main box
//   svg
//     .selectAll("boxes")
//     .data(sumstat)
//     .enter()
//     .append("rect")
//         .attr("x", function(d){return(x(d.value.q1))}) // console.log(x(d.value.q1)) ;
//         .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))}) //console.log(x(d.value.q3)-x(d.value.q1))
//         .attr("y", function(d) { return y(d.key); })
//         .attr("height", y.bandwidth() )
//         .attr("stroke", "black")
//         .style("fill", "#69b3a2")
//         .style("opacity", 0.3)

//   // Show the median
//   svg
//     .selectAll("medianLines")
//     .data(sumstat)
//     .enter()
//     .append("line")
//       .attr("y1", function(d){return(y(d.key))})
//       .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
//       .attr("x1", function(d){return(x(d.value.median))})
//       .attr("x2", function(d){return(x(d.value.median))})
//       .attr("stroke", "black")
//       .style("width", 80)

//   // create a tooltip
//   var tooltip = d3.select("#my_dataviz")
//     .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("font-size", "16px")
//   // Three function that change the tooltip when user hover / move / leave a cell
//   var mouseover = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 1)
//     tooltip
//         .html("<span style='color:grey'>Sepal length: </span>" + d.Sepal_Length) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
//         .style("left", (d3.mouse(this)[0]+30) + "px")
//         .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var mousemove = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+30) + "px")
//       .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var mouseleave = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }

//   // Add individual points with jitter
//   var jitterWidth = 50
//   svg
//     .selectAll("indPoints")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function(d){ return(x(d.Sepal_Length))})
//       .attr("cy", function(d){ return( y(d.Species) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
//       .attr("r", 4)
//       .style("fill", function(d){ return(myColor(+d.Sepal_Length)) })
//       .attr("stroke", "black")
//       .on("mouseover", mouseover)
//       .on("mousemove", mousemove)
//       .on("mouseleave", mouseleave)


// })

/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
// window.addEventListener("load", drawCircles);

// function drawCircles() {
//     // d3 has been added to the html in a <script> tag so referencing it here should work.
//     const svg = d3.select("svg");

//     const Padding = { TOP: 20, LEFT: 20, BOTTOM: 20, RIGHT: 20 };

//     const functionThatConvertsHeightToXCoordinates = d3.scaleLinear()
//         .domain([d3.min(data, d => d.height), d3.max(data, d => d.height)]) // TODO
//         .range([Padding.LEFT*2, svg.attr("width") - Padding.RIGHT]); // svg.attr("width") is one way to get it

//     const functionThatConvertsWeightToYCoordinates = d3.scaleLinear()
//         .domain([d3.max(data, d => d.weight), d3.min(data, d => d.weight)]) // TODO
//         .range([Padding.TOP, svg.attr("height") - Padding.BOTTOM*2]); // svg.attr("width") is one way to get it

//     // svg.append("g") creates an SVG <g> element, short for "group."
//     // It doesn’t draw anything by itself, but serves to group child elements together.
//     const xAxis = svg.append("g")
//         .call(d3.axisBottom(functionThatConvertsHeightToXCoordinates)) // creates a bunch of elements inside the <g>
//         .attr("transform", `translate(0, ${svg.attr("height") - Padding.BOTTOM*2})`); // TODO yTranslation
//     const yAxis = svg.append("g")
//         .call(d3.axisLeft(functionThatConvertsWeightToYCoordinates))
//         .attr("transform", `translate(${Padding.RIGHT*2}, 0)`); // TODO xTranslation

//     svg.selectAll("circle")
//         .data(data)
//         .join("circle")
//             .attr("cx", d => functionThatConvertsHeightToXCoordinates(d.height))
//             .attr("cy", d => functionThatConvertsWeightToYCoordinates(d.weight))
//             .attr("r", 3)
//             .attr("fill", "red");
    
//     svg.append("text")
//         .attr("font-size", 12)
//         .attr("font-weight", "bold")
//         .attr("font-family", "sans-serif")
//         .attr("x", svg.attr("width")/2)
//         .attr("y", svg.attr("height")-6)
//         .attr("text-anchor", "middle")
//         .text("Height (in)");
//     svg.append("text")
//         .attr("font-size", 12) // This code duplication signals that these properties
//         .attr("font-weight", "bold") // should be moved to CSS. For now, the code is here
//         .attr("font-family", "sans-serif") // to simplify our directions to you.
//         .attr("transform", `translate(${10} ${svg.attr("height")/2}) rotate(-90)`)
//         .text("Weight (lb)");
//     svg.append("text")
//         .attr("font-size", svg.attr("width")*0.04)
//         .attr("font-weight", "bold")
//         .attr("font-family", "sans-serif")
//         .attr("x", svg.attr("width")/2)
//         .attr("y", svg.attr("width")*0.04)
//         .attr("text-anchor", "middle")
//         .text("Heights vs. Weights of a Sample");
// }