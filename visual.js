
var statsPromise = d3.csv("Visuals/Sheet2.csv");

statsPromise.then(
function (stats)
{

    makeGraph(stats)
})