var testfun = function () {
    console.log("test")
}

var mainfun = function () {
    console.log("main")
}

var d3refresh = function () {
    var testData = []
    for (let i = 0; i < 5; i++) {
        testData.push({
            "id": i,
            "value": Math.floor(Math.random() * 50),
            "xPos": Math.floor(Math.random() * 400),
            "yPos": Math.floor(Math.random() * 400)
        });
    }
    console.log(testData)
    var svg = d3.select("#chart");
    width = parseInt(svg.style("width"));
    height = parseInt(svg.style("height"))
    counter = 5



    var update = function (svg, gData, d = 1000) {
        console.log("here", gData)
        const circles = svg.selectAll("circle").data(testData, (d) => d.id);
        circles.exit()
            .transition()
            .duration(d)
            .attr("r", 0)
            .remove();
        circles.enter().append("circle")
            .attr("cy", d => d.xPos)
            .attr("cx", d => d.yPos)
            .on("click", function () {
                console.log("clicked")
                d3.select(this).attr("fill", "green")
            })
            .attr("fill", "orange")
            .attr("stroke", "black")
            .transition().duration(d)
            .attr("r", d => d.value)
        circles.merge(circles)
            .transition().duration(d)
            .attr("cy", d => d.xPos)
            .attr("cx", d => d.yPos)
            .attr("r", d => d.value)
        // note the varable name d ca be replaced with any vriable name

    }
    update(svg, testData, 0)
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
            "value": Math.floor(Math.random() * 50),
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

var d3joy = function () {
    var data = [
        [0, "First"],
        [1, "Second"],
        [2, "Third"],
        [3, "Fourth"],
        [4, "Fifth"],
        [5, "Sixth"]
    ];
    console.log("d3joy")
    counter = 6
    var changed = false;
    var added = false;
    var loaded = false
    var removed = false
    var reset = false
    var hilighted = false
    var update = function () {
        var d3Select = d3.select("#list");
        console.log("update ", data)
        var list = d3Select.selectAll("li").data(data, d => d[0]);
        list.join(
            enter =>
            enter.append("li")
            .text(d => d[1])
            .on("click", function () {
                this.toggle = !this.toggle; // declared variable setting it to true
                d3.select(this)
                    .transition().duration(1000)
                    .style("color", this.toggle ? "purple" : "orange");
            })
            .style("color", "rgba(255,255,255, 0.0)")
            .transition().duration(1000)
            .style("color", "orange"),
            update =>
            update.text(d => d[1]),
            exit =>
            exit
            .style("color", "blue")
            .transition().duration(1000)
            .style("color", "rgba(255,255,255, 0.0)")
            .remove()
        )
    }

    var changeAllColors = function () {
        var d3Select = d3.select("#list");
        console.log("change ", data)
        var list = d3Select.selectAll("li").data(data, d => d[0]);
        list.transition().duration(2000).style("color", function (d) {
            if (d[0] == 5) {
                return "blue"
            }
            return "rgba(190,190,190, 0.3)";
        })
    }
    document.getElementById("btnLoad").onclick = function () {
        loaded = true;
        update();
    }
    document.getElementById("btnRemove").onclick = function () {
        data.splice(1, 1);
        update();
    }
    document.getElementById("btnChange").onclick = function () {

        data[3][1] = "THIS has Changed";
        update()
        changed = true
    }
    document.getElementById("btnAdd").onclick = function () {
        data.splice(2, 0, [counter, "New at third pos"]);
        counter++;
        update();
    }
    document.getElementById("btnHighlight").onclick = function () {
        changeAllColors();
    }


    window.addEventListener("scroll", function () {
        loadBtn = document.getElementById("btnLoad").getBoundingClientRect().top
        addBtn = document.getElementById("btnAdd").getBoundingClientRect().top
        changeBtn = document.getElementById("btnChange").getBoundingClientRect().top
        removeBtn = document.getElementById("btnRemove").getBoundingClientRect().top
        hightlightBtn = document.getElementById("btnHighlight").getBoundingClientRect().top
        xList = document.getElementById("list").getBoundingClientRect().top
        if ((loadBtn <= xList) && (!loaded)) {
            update();
            loaded = true
            reset = false
        }
        if ((loadBtn > xList) && (!reset)) {
            data = [
                [0, "First"],
                [1, "Second"],
                [2, "Third"],
                [3, "Fourth"],
                [4, "Fifth"],
                [5, "Sixth"]
            ];
            d3.select("#list").selectAll("li").style("color", "orange");
            update();
            loaded = false
            added = false
            changed = false
            removed = false
            hilighted = false
            reset = true
        }
        if ((addBtn <= xList) && (!added)) {
            data.splice(2, 0, [counter, "New at third pos"]);
            counter++;
            added = true
            update();
        }
        if ((changeBtn <= xList) && (!changed)) {
            data[3][1] = "THIS has Changed";
            changed = true;
            update();
        }
        if ((removeBtn <= xList) && (!removed)) {
            data.splice(1, 1);
            update();
            removed = true
        }
        if ((hightlightBtn <= xList) && (!hilighted)) {
            width
            changeAllColors();
            hilighted = true
        }
    });
}


var d3graph = function () {

    // set the dimensions and margins of the graph
    const margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 40
        },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json").then(function (data) {

        // Initialize the links
        const link = svg
            .selectAll("line")
            .data(data.links)
            .join("line")
            .style("stroke", "white")
            .attr("x1",width/2)
            .attr("y1",height/2)
            .attr("x2", width/2)
            .attr("y2", height/2)

        // Initialize the nodes
        const node = svg
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", 0)
            .style("fill", "blue")
            .attr("cx",height/2)
            .attr("cy",width/2)

        // Let's list the force we wanna apply on the network
        const simulation = d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink() // This force provides links between nodes
                .id(function (d) {
                    return d.id;
                }) // This provide  the id of a node
                .links(data.links) // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
            .on("end", ticked);

        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                })
                .style("stroke", "black");

            node
                .attr("r", 10)
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

    });

}