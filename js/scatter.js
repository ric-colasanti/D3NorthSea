var d3scatter = function () {
    console.log("scatter");
    var testData = []
    for (let i = 0; i < 100; i++) {
        testData.push({
            "id": i,
            "xPos": Math.floor(Math.random() * 500),
            "yPos": Math.floor(Math.random() * 500)
        });
    }
    console.log(testData)
    var svg = d3.select("#chart");
    width = parseInt(svg.style("width"));
    height = parseInt(svg.style("height"))


    function translate(d) {
        return "translate(" + d.xPos + "," + d.yPos + ")";
      }

    var enterFun = function(d3Array){
        const grp = d3Array.enter()
        // .append("svg")
        // .append("g")
        // .attr("class","nodedata")
        // grp
        // .attr("transform",translate)
        .append("circle")
        .on("click", function () {
            console.log("clicked")
            d3.select(this).attr("fill", "green")
        })     
        .attr("r", 8)
        .style("fill", "Red")

    }
    var exitFun = function(d3Array){
        d3Array.exit().select("text").remove()
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
        .attr("fill", "green")
    }



    var update = function (svg, gData) {
        const circles = svg.selectAll("g").filter(".nodedata").data(gData, (d) => d.id);
        exitFun(circles);
        enterFun(circles);
        mergeFun(circles);
    }

    update(svg, testData)
    document.getElementById("btnRemove").onclick = function () {
        console.log("remove");
        testData.splice(3, 1)
        console.log(testData)
        update(svg, testData)
    }
    document.getElementById("btnAdd").onclick = function () {
        console.log("add");
        randomNum = Math.round(Math.random() * 50); // 0 to 100
        console.log(randomNum);
        //counter++
        testData.push({
            "id": 101,
            "xPos": Math.floor(Math.random() * 400),
            "yPos": Math.floor(Math.random() * 400)
        })
        update(svg, testData)
    }
    document.getElementById("btnChange").onclick = function () {
        console.log("Change");
        testData.forEach(function (d) {
            d.xPos = Math.floor(Math.random() * 400);
            d.yPos = Math.floor(Math.random() * 400);
        })
        update(svg, testData)
    }
}