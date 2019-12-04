
var statsPromise = d3.csv("Sheet6.csv");

statsPromise.then(function (stats)
{
console.log(stats)
    makeGraph(stats);
}),

function(err)
{
    console.log(err);
}



var screen = {width: 500, height:600};
var margins = {top:20, right: 75, bottom:75, left:75};

var makeGraph = function(stats)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id","graph")
        .attr("transform","translate("+margins.left+","+margins.top+")")


var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

var xScale = d3.scaleBand().domain([1,2,3,4,5]).range([0, width])
var yScale = d3.scaleLinear().domain([0,50]).range([height, 0])


var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);
    
d3.select("svg").append("g").classed("axis", true);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
     .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25, "+margins.top+")")
    .call(yAxis);

drawArray(stats, xScale, yScale)
}

var drawArray = function(stats, xScale, yScale)
{
    
    var arrays = d3.select("#graph")
   .selectAll("g")
    .data(stats)
    .enter()
    //.append("g")
    //.attr("fill", "none")
    //.attr("stroke", "blue")
    //.attr("stroke-width", 2)
    //
    
     
     
    var keys = ["AEfficiency", "BEfficiency", "PEffiency", "REfficiency", "SEfficiency"];
 
 var barGenerator = d3.stack()
    .keys(keys)
 var series = barGenerator(stats)
 
 console.log(series)
    d3.select("svg")
    .append("g")
    .selectAll("g")
    .data(series)
   
    
    .enter().append("g")
    .attr("fill", function(d){return "red";})
    .append("rect")
    .attr("x", function(d,i) { console.log(d);
        return xScale(i); })
    //.attr("x", function(d,i) { return xScale(i); })
        .attr("y", function(d) { console.log(d[0,1]);
                                return yScale(d[0,1]); })
      .attr("height", function(d) { return yScale(parseInt(d[0]))-yScale(parseInt(d[1])); })
    .attr("width", "50");
    
    
    
}






