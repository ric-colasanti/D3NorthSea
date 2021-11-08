var d3refresh = function () {
    var testData = []
    for (let i = 0; i < 5; i++) {
        testData.push({
            "id": i,
            "value": Math.floor(Math.random() * 50+ 20),
            "xPos": Math.floor(Math.random() * 400),
            "yPos": Math.floor(Math.random() * 400)
        });
    }
    console.log(testData)
    var svg = d3.select("#chart");
    width = parseInt(svg.style("width"));
    height = parseInt(svg.style("height"))
    counter = 5

    function translate(d) {
        return "translate(" + d.xPos + "," + d.yPos + ")";
      }

    var enterFun = function(d3Array){
        const grp = d3Array.enter()
        .append("svg")
        .append("g")
        .attr("class","nodedata")
        grp
        .attr("transform",translate)
        .append("circle")
        .on("click", function () {
            console.log("clicked")
            d3.select(this).attr("fill", "green")
        })
        .attr("fill", "tomato")
        .attr("stroke", "black")
        .transition().duration(1000)
        .attr("r", d => d.value)
        grp
        .append("text")
        .text(d=>d.id)
    }
    var exitFun = function(d3Array){
        d3Array.exit().select("text").text("")
        d3Array.exit()
        .select("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
        .remove()
    }
    var mergeFun = function(d3Array){
        d3Array.merge(d3Array)
        .transition().duration(1000)
        .attr("transform",translate)
    }



    var update = function (svg, gData) {
        const circles = svg.selectAll("g").filter(".nodedata").data(testData, (d) => d.id);
        exitFun(circles);
        enterFun(circles);
        mergeFun(circles);
    }

    update(svg, testData)
    document.getElementById("btnRemove").onclick = function () {
        testData.splice(3, 1)
        console.log(testData)
        update(svg, testData)
    }
    document.getElementById("btnAdd").onclick = function () {
        randomNum = Math.round(Math.random() * 50); // 0 to 100
        console.log(randomNum);
        counter++
        testData.push({
            "id": counter,
            "value": Math.floor(Math.random() * 50 + 20),
            "xPos": Math.floor(Math.random() * 400),
            "yPos": Math.floor(Math.random() * 400)
        })
        update(svg, testData)
    }
    document.getElementById("btnChange").onclick = function () {
        testData.forEach(function (d) {
            d.xPos = Math.floor(Math.random() * 400);
            d.yPos = Math.floor(Math.random() * 400);
        })
        update(svg, testData)
    }
}