var testfun = function(){
    console.log("test")
}

var mainfun = function(){
    console.log("main")
}

var d3refresh = function(){
    var svg = d3.select("#chart").attr("width",500);

    var circle = svg.selectAll("circle")
        .data([32, 57, 112, 293,90]);
    var circleEnter = circle.enter()
    .append("circle")
    .attr("cy", 60)
    .attr("fill","orange")
    .attr("cx", (d, i) =>i * 50 + 35) // note the varable name d ca be replaced with any vriable name
    .attr("r", d => Math.sqrt(f));
}