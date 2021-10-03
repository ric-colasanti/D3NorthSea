var testfun = function(){
    console.log("test")
}

var mainfun = function(){
    console.log("main")
}

var d3refresh = function(){
    var svg = d3.select("#chart");

    var circle = svg.selectAll("circle")
        .data([32, 57, 112, 293,90]);
    console.log("here")
    var circleEnter = circle.enter().append("circle");

    circleEnter.attr("cy", 60);
    circleEnter.attr("cx", function (d, i) {
        console.log(i)
        return i * 50 + 30;
    });
    circleEnter.attr("r", function (d) {
        return Math.sqrt(d);
    });
}