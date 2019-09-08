var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2004-01-01"),
    endDate = new Date("2020-02-01");

var beforeDate = startDate;
var afterDate = endDate;

var svgSlider = d3.select("#timeline")
  .append("svg")
  .attr("width", 450)
  .attr("height", 200);

var xScale = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, 350])
  .clamp(true);

var slider = svgSlider.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 50 + "," + 100 + ")");



slider.append("line")
    .attr("class", "track")
    .attr("x1", xScale.range()[0])
    .attr("x2", xScale.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { 
          //dragged(d3.event.x);
          update(xScale.invert(d3.event.x)); 
        }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(xScale.ticks(10))
    .enter()
    .append("text")
    .attr("x", xScale)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("style", "fill: #fff")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")



function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", xScale(h));
  label.attr("x", xScale(h))
    .text(formatDate(h));
  
  beforeDate = new Date(formatDate(h))

  console.log(beforeDate)

  updateData()
}


var svgSlider2 = d3.select("#timeline")
  .append("svg")
  .attr("width", 450)
  .attr("height", 200);


var slider2 = svgSlider2.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 50 + "," + 100 + ")");



slider2.append("line")
    .attr("class", "track")
    .attr("x1", xScale.range()[0])
    .attr("x2", xScale.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider2.interrupt(); })
        .on("start drag", function() { 
          //dragged(d3.event.x);
          update2(xScale.invert(d3.event.x)); 
        }));

slider2.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(xScale.ticks(10))
    .enter()
    .append("text")
    .attr("x", xScale)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle2 = slider2.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9)
    .attr("cx", xScale(endDate));

var label2 = slider2.append("text")  
    .attr("class", "label")
    .attr("style", "fill: #fff")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")



function update2(h) {
  // update position and text of label according to slider scale
  handle2.attr("cx", xScale(h));
  label2.attr("x", xScale(h))
    .text(formatDate(h));
  
  afterDate = new Date(formatDate(h))

  updateData()
}




function updateData(){
    // console.log(beforeDate)
    // console.log(afterDate)

    filteredInfo = _.cloneDeep(sponsorInfo);

    Object.keys(filteredInfo).forEach(function(key) {


        for(var i = 0; i < filteredInfo[key][0].data.length; i+=1){


            projectDate = new Date(filteredInfo[key][0].data[i].date)


            if(projectDate > beforeDate && projectDate < afterDate){
                //console.log("here")
            }
            else{
              filteredInfo[key][0].data.splice(i, 1);
              i--;
            }

        }


    })

    // console.log(sponsorInfo)
    // console.log(filteredInfo)

    updateTable(currentCountry, filteredInfo[currentCountry][0].data);
}








// var margin = {left: 30, right: 30},
//     width = 400,
//     height = 500,
//     range = [startDate, endDate],
    step = 2; // change the step and if null, it'll switch back to a normal slider

// // append svg
// var svg = d3.select('#timeline').append('svg')
//     .attr('width', width)
//     .attr('height', height);

// var slider = svg.append('g')
//     .classed('slider', true)
//     .attr('transform', 'translate(' + margin.left +', '+ (height/2) + ')');

// // using clamp here to avoid slider exceeding the range limits
// var xScale = d3.scaleLinear()
//     .domain(range)
//     .range([0, width - margin.left - margin.right])
//     .clamp(true);

// // array useful for step sliders
// var rangeValues = xScale.ticks(10);
// //d3.range(range[0], range[1], step || 1)
// //    .concat(range[1]);

// console.log(rangeValues)

// var xAxis = d3.axisBottom(xScale)
//     .tickValues(rangeValues)
//     .tickFormat(function (d) {
//         return formatDateIntoYear(d);
//     });

// xScale.clamp(true);
// // drag behavior initialization
// var drag = d3.drag()
//     .on('start.interrupt', function () {
//         slider.interrupt();
//     }).on('start drag', function () {
//         dragged(d3.event.x);
//     });

// // this is the main bar with a stroke (applied through CSS)
// var track = slider.append('line').attr('class', 'track')
//     .attr('x1', xScale.range()[0])
//     .attr('x2', xScale.range()[1]);

// // this is a bar (steelblue) that's inside the main "track" to make it look like a rect with a border
// var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-inset');

// var ticks = slider.append('g')
//     .attr('class', 'ticks')
//     .attr('transform', 'translate(0, 4)')
//     .attr('style', "fill: transparent")
//     .call(xAxis);

// // drag handle
// var handle = slider.append('circle')
//     .classed('handle', true)
//     .attr('r', 8);

// // this is the bar on top of above tracks with stroke = transparent and on which the drag behaviour is actually called
// // try removing above 2 tracks and play around with the CSS for this track overlay, you'll see the difference
// var trackOverlay = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-overlay')
//     .call(drag);

// // // text to display
// // var text = svg.append('text')
// //     .attr('transform', 'translate(' + (width/2) + ', ' + height/3 + ')')
// //     .text('Value: 0');



// function dragged(value) {
//     var x = xScale.invert(value), index = null, midPoint, cx, xVal;

//     if(step) {
//         // if step has a value, compute the midpoint based on range values and reposition the slider based on the mouse position
//         for (var i = 0; i < xScale.ticks(10).length - 1; i++) {
//             if (x >= xScale.ticks(10)[i] && x <= xScale.ticks(10)[i + 1]) {
//                 index = i;
//                 break;
//             }
//         }
//         midPoint = (xScale.ticks(10)[index] + xScale.ticks(10)[index + 1]) / 2;
//         if (x < midPoint) {
//             cx = xScale(xScale.ticks(10)[index]);
//             xVal = xScale.ticks(10)[index];
//         } else {
//             cx = xScale(xScale.ticks(10)[index + 1]);
//             xVal = xScale.ticks(10)[index + 1];
//         }
//     } else {
//         // if step is null or 0, return the drag value as is
//         cx = xScale(x);
//         xVal = x.toFixed(3);
//     }
//     // use xVal as drag value
//     handle.attr('cx', cx);
//     // text.text('Value: ' + xVal);
// }