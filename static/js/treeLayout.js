const margin = {top: 10, right: 10, bottom: 40, left: 40},
    width = window.innerWidth - margin.right - margin.left,
    height = window.innerHeight - document.getElementsByClassName("navbar")[0].clientHeight - margin.top - margin.bottom,
    spaceBetweenNodes = width / 5,
    duration = 1000;
    
var i = 0;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#treeCol").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zooming))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../static/data/cv.json", function(error, json) {
  if (error) throw error;
  root = json;
  
  root.x0 = height / 2;
  root.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  update(root);
});

//d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * spaceBetweenNodes; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on('mouseover', mouseOverNode)
      .on('mouseout', mouseOutNode);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("y", function(d) { return d.children || d._children ? 0 : 0; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .attr("x", function(d) { return d.children ? -10 : (d._children ? this.getBBox().width + 10 : 10); })
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      // .attr("transform", function(d) { return d.children || d._children ? "rotate(-10,0,0)" : "rotate(0,0,0)"; })
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
function zooming() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function mouseOverNode(d,i) {
    var newMessage = $('<div role="message">').addClass('container-fluid');
    var name = $('<h3>').addClass('panel-title').append(d.name);
    if (d.where) name.append($('<small>').append(" " + d.where));
    var panel = $('<div>').addClass('panel').addClass('panel-default').attr('id','panel').append($('<div>').addClass('panel-heading').append(name)).append($('<div>').addClass('panel-body'));
    var details = $('<dl>').addClass('dl-horizontal');
    if (d.city && d.state) details.append($('<dt>').append('Where')).append($('<dd>').append(d.city + ', ' + d.state));
    if (d.city && !d.state) details.append($('<dt>').append('Where')).append($('<dd>').append(d.city));
    if (!d.city && d.state) details.append($('<dt>').append('Where')).append($('<dd>').append(d.state));
    if (d.startYear && d.endYear) details.append($('<dt>').append('When')).append($('<dd>').append('<i>' + d.startYear + '</i><small>&emsp;to&emsp;</small><i>' + d.endYear + '</i>'));
    if (d.startYear && !d.endYear) details.append($('<dt>').append('When')).append($('<dd>').append(d.startYear));
    if (!d.startYear && d.endYear) details.append($('<dt>').append('When')).append($('<dd>').append(d.endYear));
    if (details.find('dt').length > 0) $(panel).children('.panel-body').append(details);
    if (d.description) $(panel).children('.panel-body').append($('<span>')
        .append('<span class="lead">Description</span>')
        .append($('<p>').addClass('text-justify').append(d.description)));
    if (!d.description && details.find('dt').length == 0) $(panel).children('.panel-body').remove();
    newMessage.append(panel);
    $('#infoCol').html(newMessage)
    $('#panel').show()
}

function mouseOutNode(d,i) {
   $('#panel').hide()
}

d3.select(window).on("load", function() {
  d3.select("#banner").classed("hide", true);
})