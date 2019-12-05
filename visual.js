
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



var screen = {width: 500, height:700};
var margins = {top:20, right: 150, bottom:75, left:75};

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

var xScale = d3.scaleBand().domain([0,1]).range([0, width])
var yScale = d3.scaleLinear().domain([0,100]).range([height, 0])
var xName = d3.scaleBand().domain(["Bulls","Warriors"]).range([0,width])
var cScale = d3.scaleOrdinal(d3.schemeTableau10)

var xAxis = d3.axisBottom(xName);
var yAxis = d3.axisLeft(yScale);
    
d3.select("svg").append("g").classed("axis", true);
    
   var keys = ["AEfficiency", "BEfficiency", "PEffiency", "REfficiency", "SEfficiency"];
   
    
    var barGenerator = d3.stack()
    .keys(keys)
 var series = barGenerator(stats)
    
    
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

drawArray(stats, xScale, yScale, cScale)
drawLegend(stats, keys, series, cScale)
drawText(stats)
}

var drawLegend = function(stats, keys, series, cScale)
{
    d3.select("svg")
    .append("g").attr("id","legend")
    .attr("transform", "translate("+(screen.width-margins.right)+","+(margins.top)+")");
    
    var gs = d3.select("#legend")
        .selectAll("g")
        .data(keys)
        .enter()
        .append("g")
        .attr("fill", function(keys)
        {
            return cScale(keys)
    
        })
        .attr("transform", function(keys, i){
        return "translate(0,"+(i*14)+")"
    })
    
    gs.append("rect").attr("width", 10).attr("height",10)
    gs.append("text")
        .text(function(keys){return keys})
        .attr("x", 15)
        .attr("y", 10)
        .attr("fill","black")
    
}

/*var drawText = function(stats)
{
    d3.select("#bull")
    .select("p")
    .append("p")
       .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX - 200) + "px")
                  .style("top", (d3.event.pageY + 20) + "px")
                  .select("p")
                  .text("Golden State Warriors");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });
    
}*/



var drawArray = function(stats, xScale, yScale, cScale)
{
    
   /* var arrays = d3.select("#graph")
   .selectAll("g")
    .data(stats[0])
    .enter()
    //.append("g")
    //.attr("fill", "none")
    //.attr("stroke", "blue")
    //.attr("stroke-width", 2)
    */
    
     
     
    var keys = ["AEfficiency", "BEfficiency", "PEffiency", "REfficiency", "SEfficiency"];
 
 var barGenerator = d3.stack()
    .keys(keys)
 var series = barGenerator(stats)
 
 console.log(series)
    d3.select("#graph")
    .append("g")
    .selectAll("g")
    .data(series[0])
   
    
    .enter().append("g")
    .attr("fill", function(keys){return cScale("AEfficiency");})
    .append("rect")
   
    .attr("x", function(d,i) { return 50 + xScale(i); })
    
        .attr("y", function(d) {       return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0])-yScale(d[1]); })
    .attr("width", "50")

        .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX - 200) + "px")
                  .style("top", (d3.event.pageY + 20) + "px")
                  .select("p")
                  .text("Assist Efficiency: Bulls:10.3 < Warriors: 11.94 ");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });
        /*.on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });*/
    
    
    
    d3.select("#graph")
    .append("g")
    .selectAll("g")
    .data(series[1])
   
    
    .enter().append("g")
    .attr("fill", function(keys){return cScale("BEfficiency");})
    .append("rect")
   
    .attr("x", function(d,i) { return 50 + xScale(i); })
    
        .attr("y", function(d) {       return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0])-yScale(d[1]); })
    .attr("width", "50")
   .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX + 20) + "px")
                  .style("top", (d3.event.pageY - 20) + "px")
                  .select("p")
                  .text("Block Efficiency: Bulls: 1.75 < Warriors: 2.51 ");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });;
    
    d3.select("#graph")
    .append("g")
    .selectAll("g")
    .data(series[2])
    
   
    
    .enter().append("g")
    .attr("fill", function(d){return cScale("PEffiency");})
    .append("rect")
   
    .attr("x", function(d,i) { return 50 + xScale(i); })
    
        .attr("y", function(d) {  return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0])-yScale(d[1]); })
    .attr("width", "50")
       .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX - 200) + "px")
                  .style("top", (d3.event.pageY + 20) + "px")
                  .select("p")
                  .text("Points Efficiency: Bulls: 43.72 < Warriors: 47.39");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });
    
    d3.select("#graph")
    .append("g")
    .selectAll("g")
    .data(series[3])
   
    
    .enter().append("g")
    .attr("fill", function(d){return cScale("REfficiency");})
    .append("rect")
   
    .attr("x", function(d,i) { return 50 + xScale(i); })
    
        .attr("y", function(d) {       return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0])-yScale(d[1]); })
    .attr("width", "50")
       .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX - 200) + "px")
                  .style("top", (d3.event.pageY + 20) + "px")
                  .select("p")
                  .text("Rebound Efficiency: Bulls: 18.54 < Warriors: 19.05");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });
    
    d3.select("#graph")
    .append("g")
    .selectAll("g")
    .data(series[4])
   
    
    .enter().append("g")
    .attr("fill", function(d){return cScale("SEfficiency");})
    .append("rect")
   
    .attr("x", function(d,i) { return 50 + xScale(i); })
    
        .attr("y", function(d) {       return yScale(d[1]); })
      .attr("height", function(d) { return yScale(d[0])-yScale(d[1]); })
    .attr("width", "50") 
           .on("mouseover", function() {
                d3.select("#tooltip")
                  .style("left", (d3.event.pageX - 200) + "px")
                  .style("top", (d3.event.pageY + 20) + "px")
                  .select("p")
                  .text("Steal Efficiency Bulls: 10.3 < Warriors: 11.94");
            
            d3.select("#tooltip")
              .classed("hidden", false)
         })
        .on("mouseout", function(){
            d3.select("#tooltip")
              .classed("hidden", true)
        });
    
}





