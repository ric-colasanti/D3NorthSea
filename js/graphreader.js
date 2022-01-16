var d3graphreader = function () {
    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    var link_data = [
        ['BT-CHLA', '0.1', '0.4', '0.1', '0', '0', '0.1', '0.2', '0.2', '0.4', '0', '0.3', '0.5', '0.1', '0.6', '0.5', '0.3', '0.5', '0.6', '0', '0.3\n'],
        ['Chla-PEA', '0.6', '0.1', '0.3', '0.1', '0.6', '0.2', '0.1', '0.1', '0.1', '0', '0.4', '0.1', '0.1', '0.1', '0.4', '0.6', '0.6', '0.2', '0.2', '0\n'],
        ['BT-Larvae', '0.5', '1', '0.6', '0.9', '0.3', '0', '0', '0.2', '0.7', '0.6', '0.2', '0', '0.3', '0', '0.1', '0.1', '0.1', '0', '0.2', '0\n'],
        ['Catch_pel-LARVAE', '0.4', '0', '0', '0.2', '0.4', '0.5', '0.3', '0', '0.5', '0.2', '0.2', '0.1', '0.1', '0.9', '1', '0.3', '0.3', '0.3', '0.4', '0.5\n'],
        ['A2-SPEED', '0.6', '0.3', '0.3', '0', '0.1', '0.2', '0.1', '0', '0.2', '0.1', '0.3', '0.1', '0.8', '0.6', '0.4', '0.4', '0.3', '0.5', '0.4', '0.4\n'],
        ['A2-Chla', '0.1', '0.4', '0.2', '0.8', '0.5', '0.4', '0.6', '0.3', '0.9', '0.4', '0.1', '0.5', '0.1', '0.6', '0.3', '0.3', '0.2', '0.6', '0.2', '0.5\n'],
        ['A2-NetPP', '0.2', '0.5', '0.1', '0', '0.1', '0.2', '0', '0.4', '0', '0', '0.2', '0.2', '0.2', '0.3', '0.4', '0.3', '0.4', '0.5', '0.6', '0.3\n'],
        ['A4-PEA', '0.2', '0.5', '0.6', '0', '0.3', '0.2', '0.1', '0', '0.6', '0', '0.4', '0', '0.3', '0.5', '0', '0.3', '0.6', '0.4', '0.7', '0.6\n'],
        ['A4-Chla', '0.1', '0.2', '0.2', '0.1', '0', '0.3', '0.1', '0.2', '0.2', '0.3', '0.3', '0.3', '0.3', '0.8', '0.5', '0.7', '0.4', '0.5', '0.6', '0.4\n'],
        ['A4-LARVAE', '0.1', '0.1', '0.4', '0.4', '0.1', '0.2', '0.3', '0.7', '0.6', '0.4', '0.3', '0.4', '0.4', '0.1', '0', '0.4', '0.5', '0.4', '0.3', '0.1\n'],
        ['A5-SPEED', '0.4', '0.5', '0.4', '0.4', '0.1', '0.3', '0.2', '0.1', '0.1', '0', '0.5', '0.3', '0.3', '0.5', '0.4', '0', '0.1', '0.2', '0.2', '0\n'],
        ['A5-LARVAE', '0.4', '0.4', '0.4', '0.5', '0.5', '0.5', '0.3', '0.1', '0.7', '0.3', '0.1', '0.5', '0.3', '0', '0.1', '0.4', '0.2', '0.6', '0.2', '0.3\n'],
        ['A6-SST', '0.6', '0.4', '0.2', '0.4', '0.4', '0.1', '0.5', '0.3', '0.2', '0', '0', '0.1', '0.1', '0.1', '0.2', '0.1', '0.1', '0.3', '0.5', '0.4\n'],
        ['A6-W', '0.2', '0', '0.3', '0', '0.3', '0.6', '0.2', '0.3', '0.1', '0.1', '0.1', '0.1', '0.3', '0.4', '0.5', '0.3', '0.5', '0.7', '0.7', '0.5\n'],
        ['A6-NetPP', '0.6', '0.4', '0.5', '0.6', '0.1', '0', '0.4', '0', '0.1', '0', '0.1', '0.5', '0.6', '0.8', '0.3', '0.3', '0.3', '0', '0', '0\n'],
        ['PELAGICS-W', '0', '0.3', '0.1', '0.7', '0.4', '0.4', '0.3', '0.5', '0.2', '0.3', '0.2', '0.4', '0.4', '0.3', '0.2', '0.1', '0.1', '0.5', '0.3', '0.4\n'],
        ['Chla-PELAGICS', '0.1', '0.1', '0.3', '0.2', '0.3', '0.3', '0.3', '0.4', '0.7', '0.9', '0.8', '0.5', '0', '0', '0', '0.2', '0.2', '0.3', '0.2', '0.2\n'],
        ['Larvae-PELAGICS', '0.2', '0.1', '0', '0.1', '0.2', '0.3', '0.1', '0.6', '0', '0.4', '0.4', '0.2', '0.9', '0.3', '0.6', '0.6', '0.4', '0.1', '0.2', '0\n'],
        ['Chla-DEMERSAL', '0.2', '0.1', '0.5', '0.8', '0.3', '0.6', '0.6', '0.4', '0.4', '0.3', '0.2', '0.2', '0.3', '0.3', '0.4', '0.3', '0.1', '0', '0.1', '0.1\n'],
        ['DEMERSAL-NetPP', '0.5', '0.4', '0.4', '0.2', '0.3', '0.2', '0.6', '0.3', '0', '0.3', '0.2', '0.4', '0.4', '0.4', '0.1', '0.3', '0.3', '0', '0', '0\n'],
        ['A6-DEMERSAL', '0.7', '0.6', '0.6', '0.5', '0.6', '0.5', '0.4', '0.1', '0.3', '0.2', '0.5', '0.2', '0.5', '0.4', '0.3', '0.2', '0.4', '0.1', '0.1', '0.4\n'],
        ['KITT-SST', '0.2', '0.1', '0.2', '0.5', '0.6', '0.3', '0.6', '0.7', '0.4', '0.2', '0.3', '0.1', '0', '0', '0', '0.2', '0', '0', '0.1', '0.6\n'],
        ['KITT-LARVAE', '0.3', '0.7', '0.6', '0.2', '0.2', '0.3', '0.1', '0.2', '0', '0.1', '0.4', '0.1', '0.4', '0.8', '0.2', '0.9', '0.8', '0.9', '0.4', '0\n'],
        ['KITT-SPEED', '0.3', '0.6', '0.5', '0.8', '0.4', '0.4', '0.3', '0.6', '0.6', '0.4', '0.2', '0.4', '0.7', '0.1', '0.4', '0.1', '0', '0.1', '0.1', '0\n'],
        ['BT-GUILLEMOT', '0.2', '0.2', '0.1', '0.1', '0.3', '0.5', '0.5', '0.1', '0', '0', '0', '0.3', '0.6', '0.3', '0.2', '0.6', '0.4', '0.2', '0.1', '0.5\n'],
        ['DEMERSAL-GUILLEMOT', '0.5', '0', '0.4', '0.4', '0.3', '0.3', '0.1', '0.2', '0.5', '0.7', '0.6', '0.5', '0.7', '0.2', '0.5', '0.2', '0.3', '0.1', '0.5', '0.4\n'],
        ['GUILL-NetPP', '0.3', '0.2', '0.4', '0.8', '0.4', '0.4', '0.2', '0.4', '0.4', '0.4', '0.3', '0', '0', '0', '0.2', '0', '0', '0', '0.6', '0\n'],
        ['GANN-LARVAE', '0', '0.4', '0', '0.4', '0.9', '0.2', '0.1', '0.2', '0.1', '0.2', '0.1', '0.1', '0.4', '0', '0.6', '0.4', '0.4', '0.9', '0.4', '0.8\n'],
        ['GANN-SPEED', '0.6', '0.5', '0.6', '0.8', '0.8', '0.4', '0.2', '0.1', '0.1', '0.2', '0', '0.6', '0.5', '0.2', '0.2', '0.1', '0.2', '0.3', '0', '0.2\n'],
        ['DEMERSAL-GANNET', '0.3', '0.1', '0.1', '0.2', '0.2', '0.3', '0.5', '0.1', '0', '0', '0.1', '0.1', '0.4', '0.3', '0.3', '0.4', '0.7', '0.3', '0.3', '0.3\n'],
        ['Chla-HP', '0.7', '0.3', '0.4', '0.5', '0.6', '0.5', '0.3', '0.3', '0.1', '0.1', '0', '0', '0.1', '0.2', '0.1', '0.3', '0.5', '0.5', '0.3', '0.6\n'],
        ['HP-PELAGICS', '0.3', '0.5', '0.2', '0.7', '0.3', '0.3', '0.4', '0.9', '0.4', '0.1', '0', '0.1', '0.2', '0', '0.3', '0.3', '0', '0.2', '0.7', '0.2\n'],
        ['HP-SST', '0.2', '0.1', '0.1', '0.1', '0.3', '0.1', '0.2', '0.2', '0.3', '0.5', '0.7', '0', '0', '0.2', '0.6', '0.1', '0.3', '0.6', '0.3', '0.9\n'],
        ['A6-Grey seal', '0.3', '0.5', '0.1', '0.1', '0.2', '0.4', '0.3', '0', '0.3', '0.5', '0.2', '0.2', '0.2', '0.3', '0.2', '0.5', '0.3', '0.5', '0.2', '0.1\n'],
        ['BT-Grey seal', '0.4', '0.6', '0.5', '0.5', '0.6', '0.3', '0.7', '0.1', '0', '0.2', '0.1', '0', '0.6', '0.2', '0', '0', '0.2', '0.1', '0.2', '0.1\n'],
        ['Grey seal-LARVAE', '0', '0.3', '0.4', '0.5', '0.4', '0.2', '0.2', '0.1', '0.2', '0.2', '0.1', '0.5', '0.1', '0.3', '0.4', '0.1', '0.4', '0.4', '0.1', '0.2\n'],
        ['Chla-Harbour seal', '0.4', '0.4', '0.3', '0.3', '0.5', '0.3', '0.6', '0.6', '0.7', '0.5', '0', '0', '0.3', '0', '0.4', '0.2', '0.2', '0', '0.4', '0\n'],
        ['Harbour seal-W', '0.2', '0.2', '0.2', '0.1', '0', '0', '0.4', '0.2', '0.1', '0', '0.1', '0.4', '0.4', '0.6', '0.6', '0.8', '0.6', '0.4', '0.2', '0.4\n'],
        ['Catch_pel-HV', '0.7', '1', '1', '1', '0.6', '0.8', '0.9', '0.9', '1', '0.9', '0.9', '0.6', '0.7', '0.5', '0', '0', '0.2', '0.3', '0', '0.3\n'],
        ['Chla-HV', '1', '0.3', '0.1', '0.7', '0.4', '0.4', '0.2', '0.2', '0.2', '0.4', '0.5', '0.5', '0.6', '1', '1', '1', '0.9', '0.9', '1', '1\n'],
        ['GANN-HV', '0.2', '0', '0.1', '0.2', '0', '0.5', '0.2', '0.2', '0.6', '0.7', '0.7', '0.6', '0.5', '0.7', '0.9', '0.9', '0.9', '1', '1', '1\n'],
        ['GUILL-HV', '0.4', '0.1', '0.5', '0.1', '1', '1', '0.9', '0.6', '0.6', '0.5', '0.3', '0.4', '0.6', '0.4', '0.5', '0.2', '0.5', '0.7', '0', '0.3\n'],
        ['DEMERSAL-HV', '0.4', '0.3', '0.4', '0.4', '0.4', '0.7', '0.7', '0.7', '0.9', '0.9', '0.9', '0.7', '0.7', '0.3', '0.3', '0.4', '0', '0', '0.1', '0.1']
    ]
    var years = ["RELATIONSHIPS", 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    var nodes = ['Catch_pel', 'PELAGICS', 'Larvae', 'NetPP', 'HP', 'HV', 'SPEED', 'W', 'GUILLEMOT', 'DEMERSAL', 'A2', 'CHLA', 'GUILL', 'Harbour seal', 'SST', 'A4', 'Grey seal', 'LARVAE', 'BT', 'A5', 'GANN', 'KITT', 'PEA', 'Chla', 'A6', 'GANNET']

    const data = {
        nodes: [],
        links: []
    };


    function addNode(id, name, size) {
        data.nodes.push({
            id: id,
            name: name,
            size: size,
            color: "#ff0000"
        });
    }

    function addLink(id, to, from, strength) {
        data.links.push({
            id: id,
            source: from,
            target: to,
            strength: strength
        });
    }

    var node_dict = {}
    for (var i = 0; i < nodes.length; i++) {
        addNode(i, nodes[i], 4)
        node_dict[nodes[i]] = i
    }
    for (var i = 0; i < link_data.length; i++) {
        links = link_data[i][0].split("-")
        node_from = node_dict[links[0]]
        node_to = node_dict[links[1]]
        addLink(i, node_from, node_to, parseFloat(link_data[i][2]))
    }


    let zoom = d3.zoom().on("zoom", handleZoom);;

    function handleZoom(e) {
        d3.select("svg g").attr("transform", e.transform);
    }

    // set the dimensions and margins of the graph
    const margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;



    const svg = d3
        .select("#network_viz")
        .append("svg")
        .style("border-style", "solid")
        .style("border-width", "1px")
        .call(zoom)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("svg:defs").selectAll("marker")
        .data(["end"]) // Different link/path types can be defined here
        .enter().append("svg:marker") // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 11)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");



    function update(flag) {
  
        // Initialize the links
        const link = svg
            .selectAll("line")
            .data(data.links, (d) => d.id)
            .join(
                (enter) =>
                enter
                .append("line")
                .style("stroke", "white")
                .style("stroke-width", (d) => d.strength * 4)
                .attr("marker-end", "url(#end)"),
                (update) => update.style("stroke-width", (d) => d.strength * 4),
                (exit) => exit.remove()
            );
        // Initialize the nodes
        const node = svg
            .selectAll("circle")
            .data(data.nodes, (d) => d.id)
            .join(
                (enter) =>
                enter
                .append("circle")
                .attr("r", 0)
                .attr("cy", 0)
                .attr("cx", 0)
                .style("fill", function (d) {
                    return d.color;
                }),
                (update) =>
                update
                .style("fill", function (d) {
                    return d.color;
                })
                .raise(),
                (exit) => exit.remove()
            );

        const text = svg
            .selectAll("text")
            .data(data.nodes, (d) => d.id)
            .join(
                (enter) =>
                enter
                .append("text")
                .attr("y", 0)
                .attr("x", 0)
                .text(d => d.name)
                .style("font-size", "1em"),
                (update) =>
                update
                .text(d => d.name)
                .raise(),
                (exit) => exit.remove()
            );


        if (flag == 1) {
            // Let's list the force we wanna apply on the network
            const simulation = d3
                .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
                .force(
                    "link",
                    d3
                    .forceLink() // This force provides links between nodes
                    .id(function (d) {
                        return d.id;
                    }) // This provide  the id of a node
                    .links(data.links) // and this the list of links
                )
                .force("charge", d3.forceManyBody().strength(-200)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", d3.forceCenter(width / 2, height / 2))
                .on("tick", ticked);

            // This function is run at each iteration of the force algorithm, updating the nodes position.

            function ticked() {
                for (let i = 0; i < 50; i++) {
                    simulation.tick();
                }
                node
                    .attr("r", (d) => d.size)
                    .attr("cx", function (d) {
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        return d.y;
                    });
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
                text
                    .attr("x", function (d) {
                        return d.x;
                    })
                    .attr("y", function (d) {
                        return d.y;
                    })
            }
        }
    }
    var year = 1
    document.getElementById("year").innerHTML = years[year].toString()

    function changeData(c) {
        year += c
        if (year < 1) {
            year = 1
        }
        if (year > years.length) {
            year = years.length
        }
        document.getElementById("year").innerHTML = years[year].toString()


        for (var i = 0; i < link_data.length; i++) {
            data.links[i].strength = parseFloat(link_data[i][year])
        }
    }
    document.getElementById("btnFoward").onclick = function () {
        changeData(1);
        update(1);
    };
    document.getElementById("btnBack").onclick = function () {
        changeData(-1);
        update(1);
    };
    update(1);
};