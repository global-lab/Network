var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("1998-01-01"),
    endDate = new Date("2020-02-01");

var beforeDate = startDate;
var afterDate = endDate;

var svgSlider = d3.select("#timeline")
  .append("svg")
  .attr("width", 450)
  .attr("height", 150);

var xScale = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, 350])
  .clamp(true);

var slider = svgSlider.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 50 + "," + 100 + ")");


var text1 = svgSlider.append("text")
                    .attr("x", 20)
                    .attr("y", 40)
                    .attr("font-size", "20px")
                    .attr("fill", "white")
                    .text("Earliest desired project date: " + formatDate(startDate));

var borderPath = svgSlider.append("rect")
  .attr("x", 0)
  .attr("y", 10)
  .attr("height", 140)
  .attr("width",450)
  .style("stroke", "white")
  .style("fill", "none")
  .style("stroke-width", 2);



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
  text1.text("After " + formatDate(h))
  
  beforeDate = new Date(formatDate(h))

  updateData()
}


var svgSlider2 = d3.select("#timeline")
  .append("svg")
  .attr("width", 450)
  .attr("height", 150);


var slider2 = svgSlider2.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 50 + "," + 100 + ")");


var text2 = svgSlider2.append("text")
                  .attr("x", 20)
                  .attr("y", 40)
                  .attr("font-size", "20px")
                  .attr("fill", "white")
                  .text("Latest desired project date: " + formatDate(endDate));

var borderPath2 = svgSlider2.append("rect")
  .attr("x", 0)
  .attr("y", 10)
  .attr("height", 140)
  .attr("width",450)
  .style("stroke", "white")
  .style("fill", "none")
  .style("stroke-width", 2);



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
    .text(formatDate(endDate))
    .attr("x", xScale(endDate))
    .attr("transform", "translate(0," + (-25) + ")")



function update2(h) {
  // update position and text of label according to slider scale
  handle2.attr("cx", xScale(h));
  label2.attr("x", xScale(h))
    .text(formatDate(h));
  text2.text("Before " + formatDate(h))
  
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

    if(currentCountry != null){
      updateTable(currentCountry, filteredInfo[currentCountry][0].data);
    }
    
    hideShow()
}


function hideShow(){

  Object.keys(filteredInfo).forEach(function (key){

    if(filteredInfo[key][0].data.length == 0){
      mymap.removeLayer(markerLayers[key])
    }
    else{
      mymap.addLayer(markerLayers[key])
    }

  })

  
}