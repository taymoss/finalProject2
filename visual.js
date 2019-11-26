
var statsPromise = d3.csv("Visuals/Sheet2.csv");

statsPromise.then(
function (stats)
{

    makeGraph(stats)
}

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
var height = screen.height - margin.top - margins.bottom;

var xScale = d3.scaleLinear().domain([0,38]).range({0, width});
var yScale = d3.scaleLinear().domain([0,10]).range([height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axis.Bottom(yScale);
d3.select("svg").append("g").classed("axis", true);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+","margins.top+height)+")
    .call(xAxis);
    
    d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25, "+margins.top")")
    .call(yAxis);

drawArray(stats, xScale, yScale)
}

var drawArray = function(stats, xScale, yScale)
{
    d3.stack()
    .keys("Points Effiency", "Assist Efficiency", "Rebound Efficiency", "Block Efficiency", "Steal Efficiency")
    
}



)
