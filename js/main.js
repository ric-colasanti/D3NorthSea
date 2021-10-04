var testfun = function () {
    console.log("test")
}

var mainfun = function () {
    console.log("main")
}

var d3refresh = function () {
    var testData = [32, 57, 112, 293,90]
    document.getElementById("button")
    var svg = d3.select("#chart");
    width = parseInt(svg.style("width"));
    height = parseInt(svg.style("height"))
    var update = function (svg, gData) {
        console.log("here",gData)
        var circle = svg.selectAll("circle")
            .data(gData);
        circle.enter()
            .append("circle")
            .attr("cy", 60)
            .attr("fill", "orange")
            .attr("cx", (d, i) => i * 50 + 35) // note the varable name d ca be replaced with any vriable name
            .attr("r", d => Math.sqrt(d))
            .on("click", function () {
                console.log("clicked")
                d3.select(this).attr("fill", "pink")
            });
        circle.exit().remove()
       
    }
    update(svg,testData )
    document.getElementById("btnRemove").onclick = function(){
        testData.pop()
        update(svg,testData)
    }
    document.getElementById("btnAdd").onclick = function(){
        randomNum = Math.round(Math.random() * 501);  // 0 to 100
        console.log(randomNum);
        testData.push(randomNum)
        update(svg,testData)
    }
}