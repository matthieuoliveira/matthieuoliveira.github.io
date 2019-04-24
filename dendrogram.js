var width = 800,
    height = 550;

var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select(".dendrogram").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
  .attr("transform", "translate(40,0)");

d3.json("static/data/data.json", function(error, root) {
  var nodes = cluster.nodes(root),
      links = cluster.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
     .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("stroke", "#FFFFFF")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 5);

  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
});

d3.select(self.frameElement).style("height", height + "px");