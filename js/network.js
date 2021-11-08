function viz01() {

    w = 960;
    h = 600;

    nodeHash = new Array();

    var force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([w, h]);

    var nodes = force.nodes(),
        links = force.links();

    var vis = d3.select("div#viz01_main").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    force.on("tick", function () {
        vis.selectAll("g.node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        vis.selectAll("line.link")
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
            });
    });

    function restart() {
        var link = vis.selectAll("line.link")
            .data(links, function (d) {
                return d.source.id + "-" + d.target.id;
            });

        link.enter().insert("svg:line", "g.node")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", function (d) {
                return (d.relation == "spouseOf") ? "YellowGreen" : "SkyBlue"
            })
            .style("stroke-width", 4);

        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id;
            });


        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .call(force.drag)
            .on("dblclick", step3);

        node.append("svg:circle")
            .attr("class", "circle")
            .attr("r", 8);

        node.append("svg:image")
            .attr("class", "circle")
            .attr("xlink:href", function (d) {
                return (d.gender == "M") ? "male.svg" : "female.svg"
            })
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 16)
            .attr("height", 16);

        nodeEnter.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.id
            });

        node.exit().remove();

        force.start();
    }

    function step1() {
        d3.json("darwin.json", function (json) {

            for (x = 0; x < json.nodes.length; x++) {
                nodes.push(json.nodes[x]);
                nodeHash[json.nodes[x].id] = x;
            }

            for (x = 0; x < json.links.length; x++) {
                links.push({
                    source: json.nodes[json.links[x].source],
                    target: json.nodes[json.links[x].target],
                    "relation": json.links[x].relation,
                    "id": json.links[x].id
                });
            }

            restart();
        })
    }

    function step2() {
        nodes.splice(1, 1); // remove b
        links.shift(); // remove a-b
        links.pop(); // remove b-c
        restart();
    }

    function step3(d, i) {
        var pathClick = "erasmus.json";
        d3.json(pathClick, function (json) {
            for (x = 0; x < json.nodes.length; x++) {
                var found = false;
                for (y = 0; y < nodes.length; y++) {
                    if (nodes[y].id == json.nodes[x].id) {
                        found = true;
                    }
                }
                if (found == false) {
                    nodes.push(json.nodes[x]);
                    nodeHash[json.nodes[x].id] = nodes.length - 1;
                }
            }

            for (x = 0; x < json.links.length; x++) {
                var found = false;
                for (y = 0; y < links.length; y++) {
                    if (links[y].id == json.links[x].id) {
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    links.push({
                        source: nodes[nodeHash[json.links[x].sid]],
                        target: nodes[nodeHash[json.links[x].tid]],
                        "relation": json.links[x].relation,
                        "id": json.links[x].id
                    });
                }
            }

            restart();
        })

    }

    restart();
    setTimeout(step1, 500);

} //end viz01()