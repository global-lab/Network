var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2004-11-01"),
    endDate = new Date("2010-04-01");

// var svgSlider = d3.select("#timeline")
//   .append("svg")
//   .attr("width", 450)
//   .attr("height", 200);

// var x = d3.scaleTime()
//   .domain([startDate, endDate])
//   .range([0, 350])
//   .clamp(true);

// var slider = svgSlider.append("g")
//   .attr("class", "slider")
//   .attr("transform", "translate(" + 50 + "," + 100 + ")");



// slider.append("line")
//     .attr("class", "track")
//     .attr("x1", x.range()[0])
//     .attr("x2", x.range()[1])
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-inset")
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-overlay")
//     .call(d3.drag()
//         .on("start.interrupt", function() { slider.interrupt(); })
//         .on("start drag", function() { 
//           dragged(d3.event.x);
//           update(x.invert(d3.event.x)); 
//         }));

// slider.insert("g", ".track-overlay")
//     .attr("class", "ticks")
//     .attr("transform", "translate(0," + 18 + ")")
//   .selectAll("text")
//     .data(x.ticks(10))
//     .enter()
//     .append("text")
//     .attr("x", x)
//     .attr("y", 10)
//     .attr("text-anchor", "middle")
//     .text(function(d) { return formatDateIntoYear(d); });

// var handle = slider.insert("circle", ".track-overlay")
//     .attr("class", "handle")
//     .attr("r", 9);

// var label = slider.append("text")  
//     .attr("class", "label")
//     .attr("style", "fill: #fff")
//     .attr("text-anchor", "middle")
//     .text(formatDate(startDate))
//     .attr("transform", "translate(0," + (-25) + ")")



    

// // d3.csv("circles.csv", prepare, function(data) {
// //   dataset = data;
// //   drawPlot(dataset);
// // })

// // function prepare(d) {
// //   d.id = d.id;
// //   d.date = parseDate(d.date);
// //   return d;
// // }

// function update(h) {
//   // update position and text of label according to slider scale
//   handle.attr("cx", x(h));
//   label
//     .attr("x", x(h))
//     .text(formatDate(h));

//   // filter data set and redraw plot
//   // var newData = dataset.filter(function(d) {
//   //   return d.date < h;
//   // })
  

//   updateData()
// }

// function updateData(date){

// }








var margin = {left: 30, right: 30},
    width = 860,
    height = 500,
    range = [startDate, endDate],
    step = 2; // change the step and if null, it'll switch back to a normal slider

// append svg
var svg = d3.select('#timeline').append('svg')
    .attr('width', width)
    .attr('height', height);

var slider = svg.append('g')
    .classed('slider', true)
    .attr('transform', 'translate(' + margin.left +', '+ (height/2) + ')');

// using clamp here to avoid slider exceeding the range limits
var xScale = d3.scaleLinear()
    .domain(range)
    .range([0, width - margin.left - margin.right])
    .clamp(true);

// array useful for step sliders
var rangeValues = d3.range(range[0], range[1], step || 1)
    .concat(range[1]);

var xAxis = d3.axisBottom(xScale)
    .tickValues(rangeValues)
    .tickFormat(function (d) {
        return d;
    });

xScale.clamp(true);
// drag behavior initialization
var drag = d3.drag()
    .on('start.interrupt', function () {
        slider.interrupt();
    }).on('start drag', function () {
        dragged(d3.event.x);
    });

// this is the main bar with a stroke (applied through CSS)
var track = slider.append('line').attr('class', 'track')
    .attr('x1', xScale.range()[0])
    .attr('x2', xScale.range()[1]);

// this is a bar (steelblue) that's inside the main "track" to make it look like a rect with a border
var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-inset');

var ticks = slider.append('g')
    .attr('class', 'ticks')
    .attr('transform', 'translate(0, 4)')
    .attr('style', "fill: transparent")
    .call(xAxis);

// drag handle
var handle = slider.append('circle')
    .classed('handle', true)
    .attr('r', 8);

// this is the bar on top of above tracks with stroke = transparent and on which the drag behaviour is actually called
// try removing above 2 tracks and play around with the CSS for this track overlay, you'll see the difference
var trackOverlay = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-overlay')
    .call(drag);

// // text to display
// var text = svg.append('text')
//     .attr('transform', 'translate(' + (width/2) + ', ' + height/3 + ')')
//     .text('Value: 0');



function dragged(value) {
    var x = xScale.invert(value), index = null, midPoint, cx, xVal;

    if(step) {
        // if step has a value, compute the midpoint based on range values and reposition the slider based on the mouse position
        for (var i = 0; i < rangeValues.length - 1; i++) {
            if (x >= rangeValues[i] && x <= rangeValues[i + 1]) {
                index = i;
                break;
            }
        }
        midPoint = (rangeValues[index] + rangeValues[index + 1]) / 2;
        if (x < midPoint) {
            cx = xScale(rangeValues[index]);
            xVal = rangeValues[index];
        } else {
            cx = xScale(rangeValues[index + 1]);
            xVal = rangeValues[index + 1];
        }
    } else {
        // if step is null or 0, return the drag value as is
        cx = xScale(x);
        xVal = x.toFixed(3);
    }
    // use xVal as drag value
    handle.attr('cx', cx);
    // text.text('Value: ' + xVal);
}