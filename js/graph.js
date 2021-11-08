var d3graph = function () {

    function randInt(max) {
        return Math.floor((Math.random() * max))
    }

    const data = {
        "nodes": [{
            "id": 0,
            "name": String.fromCharCode(65),
            "linked": false
        }],
        "links": []
    }
    for (let index = 1; index < 20; index++) {
        choice = data.nodes[randInt(data.nodes.length)]
        choice.linked = true
        data.nodes.push({
            "id": index,
            "name": String.fromCharCode(65 + index),
            "size": Math.floor(Math.random()*10)+2
        })
        data.links.push({
            "id":index,
            "source": choice.id,
            "target": index,
            "strength":Math.floor(Math.random()*3)+1
        })
    }
    console.log(data);
    // set the dimensions and margins of the graph
    const margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);
    function update() {
        // append the svg object to the body of the page
        document.getElementById("btnChange").className = "btn btn-secondary"
        document.getElementById("btnChange").disabled = true


        // Initialize the links
        const link = svg
            .selectAll("line")
            .data(data.links, d=>d.id)
            .join(
            enter =>
            enter.append("line")
            .style("stroke", "white")
            .style("stroke-width",d=>d.strength),
            update=>update
            .style("stroke-width",d=>d.strength),
            exit=>exit.remove()
        );
        // Initialize the nodes
        const node = svg
            .selectAll("circle")
            .data(data.nodes, d=>d.id)
            .join(
            enter => enter
            .append("circle")
            .attr("r", 0)
            .attr("cy",0)
            .attr("cx",0)
            .style("fill", function (d) {
            return d.linked ? "blue" : "orange"
            }),
            update=>
            update.style("fill", function (d) {
                return d.linked ? "blue" : "orange"
                })
            .raise(),
            exit=>
            exit.remove()
        );
        
        
        // Let's list the force we wanna apply on the network
        const simulation = d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink() // This force provides links between nodes
                .id(function (d) {
                    return d.id;
                }) // This provide  the id of a node
                .links(data.links) // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-10)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked)
            .on("end",function(){
                document.getElementById("btnChange").disabled = false
                document.getElementById("btnChange").className = "btn btn-primary"
            });
        
        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {

            node
                .attr("r", d=>d.size)
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
            
        }
    }
    function addData(){
        const index = data.nodes.length+1 
        choice = data.nodes[randInt(data.nodes.length)] 
        choice.linked = true
        data.nodes.push({"id":index,"name":String.fromCharCode(65+index),"size": Math.floor(Math.random()*10)+2})
        choice.linked = true;
        data.links.push({"source":choice.id,"target":index,"id":index,"strength":Math.floor(Math.random()*3)+1})
    }
    document.getElementById("btnChange").onclick = function () {
        addData()
        update()
    }
    
    update()

}