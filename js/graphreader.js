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
            size: 500,
            color: "#44ff00",
            img: "https://www.shareicon.net/data/128x128/2016/06/28/787804_animal_512x512.png"
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
            .selectAll("image")
            .data(data.nodes, (d) => d.id)
            .join(
                (enter) =>
                enter
                .append("image")
                .attr("xlink:href",  function(d) { return d.img;})
                .attr("x",0)
                .attr("y",0)
                .attr("width", 30)
      .attr("height", 30)
      .on( 'mouseenter', function() {
        // select element in current context
        d3.select( this )
          .transition()
          .attr("x", function(d) { return d.x - 60;})
          .attr("y", function(d) { return d.y - 60;})
          .attr("height", 100)
          .attr("width", 100);
      })
      // set back
      .on( 'mouseleave', function() {
        d3.select( this )
          .transition()
          .attr("x", function(d) { return d.x -15;})
          .attr("y", function(d) { return d.y -15;})
          .attr("height", 30)
          .attr("width", 30);
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
                    .attr("x", function (d) {
                        return d.x-15;
                    })
                    .attr("y", function (d) {
                        return d.y-15;
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

    function showYear(year){
        console.log("show");
        document.getElementById("year").innerHTML = years[year].toString()


        for (var i = 0; i < link_data.length; i++) {
            data.links[i].strength = parseFloat(link_data[i][year])
        }
    }
    function changeData(c) {
        year += c
        if (year < 1) {
            year = 1
        }
        if (year > years.length) {
            year = years.length
        }
        showYear(year)
    }
    document.getElementById("btnFoward").onclick = function () {
        changeData(1);
        update(0);
    };
    document.getElementById("btnBack").onclick = function () {
        changeData(-1);
        update(0);
    };
    update(1);
    var f2000 = false
    var f2001 = false
    var f2002 = false
    var f2003 = false
    var f2004 = false
    var f2005 = false
    var f2006 = false
    var f2007 = false
    var f2008 = false
    var f2009 = false
    var f2010 = false
    var f2011 = false
    var f2012 = false
    var f2013 = false
    var f2014 = false
    var f2015 = false
    var f2016 = false
    var f2017 = false
    var f2018 = false
    var f2019 = false

    function setMkr(){
        f2000 = false
        f2001 = false
        f2002 = false
        f2003 = false
        f2004 = false
        f2005 = false
        f2006 = false
        f2007 = false
        f2008 = false
        f2009 = false
        f2010 = false
        f2011 = false
        f2012 = false
        f2013 = false
        f2014 = false
        f2015 = false
        f2016 = false
        f2017 = false
        f2018 = false
        f2019 = false
    }


    window.addEventListener("scroll", function () {

        ld2000 = document.getElementById("btn2000").getBoundingClientRect().top
        ld2001 = document.getElementById("btn2001").getBoundingClientRect().top
        ld2002 = document.getElementById("btn2002").getBoundingClientRect().top
        ld2003 = document.getElementById("btn2003").getBoundingClientRect().top
        ld2004 = document.getElementById("btn2004").getBoundingClientRect().top
        ld2005 = document.getElementById("btn2005").getBoundingClientRect().top
        ld2006 = document.getElementById("btn2006").getBoundingClientRect().top
        ld2007 = document.getElementById("btn2007").getBoundingClientRect().top
        ld2008 = document.getElementById("btn2008").getBoundingClientRect().top
        ld2009 = document.getElementById("btn2009").getBoundingClientRect().top
        ld2010 = document.getElementById("btn2010").getBoundingClientRect().top
        // ld2011 = document.getElementById("btn2011").getBoundingClientRect().top
        // ld2012 = document.getElementById("btn2012").getBoundingClientRect().top
        // ld2013 = document.getElementById("btn2013").getBoundingClientRect().top
        // ld2014 = document.getElementById("btn2014").getBoundingClientRect().top
        // ld2015 = document.getElementById("btn2015").getBoundingClientRect().top
        // ld2016 = document.getElementById("btn2016").getBoundingClientRect().top
        // ld2017 = document.getElementById("btn2017").getBoundingClientRect().top
        // ld2018 = document.getElementById("btn2018").getBoundingClientRect().top
        // ld2019 = document.getElementById("btn2019").getBoundingClientRect().top
        xList = document.getElementById("network_viz").getBoundingClientRect().top
        // console.log(ld2001,xList);
        if ((ld2000 >= xList)&&(!f2000)) {
            setMkr()
            console.log("Here")
            showYear(1)
            update(0);
            f2000 = true       }
        if ((ld2001 <= xList)&&(!f2001)) {
            console.log("Here")
            showYear(2)
            update(0);
            f2001 = true
            f2000 = false
        }
        if ((ld2002 <= xList)&&(!f2002)) {
            console.log("Here")
            showYear(3)
            update(0);
            f2002 = true
        }
        if ((ld2003 <= xList)&&(!f2003)) {
            console.log("Here")
            showYear(4)
            update(0);
            f2003 = true
        }
        if ((ld2003 <= xList)&&(!f2003)) {
            console.log("Here")
            showYear(5)
            update(0);
            f2003 = true
        }       
        if ((ld2004 <= xList)&&(!f2004)) {
            console.log("Here")
            showYear(6)
            update(0);
            f2004 = true
        }        
        if ((ld2005 <= xList)&&(!f2005)) {
            console.log("Here")
            showYear(7)
            update(0);
            f2005 = true
        }       
        if ((ld2006 <= xList)&&(!f2006)) {
            console.log("Here")
            showYear(8)
            update(0);
            f2006 = true
        }        
        if ((ld2007 <= xList)&&(!f2007)) {
            console.log("Here")
            showYear(9)
            update(0);
            f2007 = true
        }        
        if ((ld2008 <= xList)&&(!f2008)) {
            console.log("Here")
            showYear(10)
            update(0);
            f2008 = true
        }        
        if ((ld2009 <= xList)&&(!f2009)) {
            console.log("Here")
            showYear(11)
            update(0);
            f2009 = true
        }        
        if ((ld2010 <= xList)&&(!f2010)) {
            console.log("Here")
            showYear(12)
            update(0);
            f2010 = true
        }           
    });
};