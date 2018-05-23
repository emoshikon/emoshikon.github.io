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

var root = {"children":[{"name":"Experience","childOf":"Life","children":[{"childOf":"Experience","children":[{"endYear":"Present","name":"Product Manager - Search Backend","description":"Shaped and launched eBay’s new proprietary search engine platform – Cassini, managing multiple domains in the Search team","city":"San Jose","startYear":"Jan'12","state":"CA","where":"eBay Inc.","children":[{"childOf":"Product Manager - Search Backend","children":[{"name":"Index Latency","childOf":"Data Indexing","description":"Drove strategy across multiple development teams to significantly decrease the time it takes to propagate index updates"},{"name":"Index Performance","childOf":"Data Indexing","description":"Managed cross-functional project to optimize index acquisition and generation"}],"name":"Data Indexing","endYear":"Present","startYear":"Mar'14"},{"startYear":"Jan'12","endYear":"Mar'14","name":"Search Reliability Engineering","childOf":"Product Manager - Search Backend","children":[{"childOf":"Search Reliability Engineering","description":"Successfully launched the platform while maintaining 99.99% availability over time","endYear":"2014","startYear":"2012","name":"Availability"},{"endYear":"2013","startYear":"2013","name":"Traffic Routing","description":"Conceived and led a feature to consolidate all client traffic logic to move it downstream. This resulted in instant Ops executions while maintaining perfect reliability, which remains to be issue free since launch","childOf":"Search Reliability Engineering"},{"endYear":"2014","name":"Traffic Shaping","startYear":"2013","childOf":"Search Reliability Engineering","description":"Conceived and led a feature to strictly enforce client based quotas and mandate credential for each query resulting in stronger safeguards"},{"startYear":"2012","endYear":"2014","name":"Support Customer Support","childOf":"Search Reliability Engineering","description":"Partnered with Customer Support in translating low-level technical data into selling and buying insights in order to quickly address frequent inquires. This resulted in solving 8% of search issues that previously needed technical support"},{"description":"Led a cross-functional, organization-wide project to review and remodel all monitoring tools, spanning multiple organizations: NOC, Operations, Infrastructure & Development. This initiative touched the log storage and ingestion, the alerting infrastructure and the visualization","childOf":"Search Reliability Engineering","startYear":"Jan'12","endYear":"Mar'14","name":"Monitoring"}]},{"endYear":"Present","name":"Catalog/Product integration","startYear":"2014","childOf":"Product Manager - Search Backend","description":"Led the project to reengineer the way structured data is being stored and used in our search engine, from schema design to service development, in partnership with our offsite Israeli team"}],"childOf":"Product Manager"}],"startYear":"Jan'12","endYear":"Present","name":"Product Manager"},{"childOf":"Experience","children":[{"children":[{"name":"Catalog Intelligence Tech Lead, Structured Data","endYear":"Dec'11","startYear":"Jan'11","state":"Israel","description":"Responsible for promoting and managing new tools and procedures","childOf":"Tech Lead","city":"Netanya"}],"childOf":"Software Engineer","name":"Tech Lead"},{"children":[{"name":"ClearCase™ Engineer","childOf":"Assistant Software Engineer","description":"Implemented a new ClearCase™ (configuration management tool) environment and customized software for each department. Remodeled and maintained a new team website for public use"},{"childOf":"Assistant Software Engineer","description":"Automated new scripts which helped reduce 15% of the disk space required for the working environment. Designed improved graphic unit interfaces for better client customization","name":"Automations"}],"childOf":"Software Engineer","where":"Marvell Ltd.","state":"Israel","startYear":"Jul'07","city":"Tel Aviv","endYear":"Jul'08","name":"Assistant Software Engineer"},{"childOf":"Software Engineer","where":"eBay Inc.","state":"Israel","startYear":"Apr'10","description":"Analyzed eBay’s catalog of products for buyers and sellers and refined the data structure while innovating on paradigms and tools for the team's use","city":"Netanya","name":"Catalog Intelligence Data Manager, Structured Data","endYear":"Dec'11"},{"endYear":"2010","name":"Class Website","startYear":"2006","description":"Built and maintained a website which helped create a community for a more integrated and leading class. The website included a platform for uploading material, instant messaging and Wiki. Kind of pointless to explain that Facebook took over this niche a year later","childOf":"Software Engineer"}],"startYear":"1990","endYear":"Present","name":"Software Engineer"},{"childOf":"Experience","children":[{"name":"VC Systems Technician","endYear":"Feb'06","city":"Tel Aviv","description":"Customized and configured video conferencing infrastructure for small businesses to large enterprises. Repaired returned merchandise. Designed new automated graphical test for video/audio systems","startYear":"Feb'04","state":"Israel","where":"Polycom Inc.","childOf":"Technician"}],"name":"Technician"},{"where":"The Technion - Israel Institute of Technology","childOf":"Experience","children":[{"endYear":"2008","startYear":"2007","name":"Students' Chairman - IE&M","description":"Elected by the board of delegates in the IE&M department to manage the board and represent over 1000 students, and stand for their interests and rights in times of strikes and post-war. Strengthened the connection between the faculty and students to form a firm relationship and collaboration with the faculty","childOf":"Students Association"},{"startYear":"2007","endYear":"2008","name":"Finance Committee","description":"Participated in the association's budget committee","childOf":"Students Association"},{"description":"Mediator for students and academic staff. Rehabilitated the chaotic academic condition after the Second Lebanon war","childOf":"Students Association","name":"Academic Coordinator - IE&M","endYear":"2007","startYear":"2006"},{"description":"Represented my class in the students' association","childOf":"Students Association","name":"Semester Delegate - IE&M Spring'06","endYear":"2008","startYear":"2006"}],"startYear":"2006","state":"Israel","city":"Haifa","description":"Held multiple positions in the students' association, in the Industrial Engineering & Management department","name":"Students Association","endYear":"2008"}]},{"endYear":"Present","name":"Education","startYear":"1982","childOf":"Life","children":[{"endYear":"1988","startYear":"1984","name":"Kindergarden","children":[{"endYear":"1988","startYear":"1986","name":"Shula Kindergarden","childOf":"Kindergarden","where":"Shula, Petach Tiqva"}],"childOf":"Education"},{"startYear":"1988","endYear":"1994","name":"Elementary School","where":"Hess, Petach Tiqva","childOf":"Education"},{"endYear":"1996","name":"Middle School","startYear":"1994","childOf":"Education","where":"Ben-Zvi, Petach Tiqva"},{"endYear":"2000","name":"High School","startYear":"1996","childOf":"Education","where":"Handesaim, Tel Aviv"},{"children":[{"childOf":"Undergraduate","where":"The Technion - Israel Institute of Technology","state":"Israel","startYear":"2006","city":"Haifa","description":"Bachlor of Science - Industrial Engineering and Management","name":"B.Sc IE&M","endYear":"2010"},{"startYear":"2008","state":"Israel","where":"The Technion - Israel Institute of Technology","childOf":"Undergraduate","name":"B.A Economics","endYear":"2010","description":"Bachlor of Arts - Economics","city":"Haifa"},{"where":"Brown University","childOf":"Undergraduate","startYear":"2008","state":"RI","city":"Providence","description":"Participated in a program which sends Israelis to study for one academic year at the university, under a full scholarship (Tuition & accommodation) from the Sidney Frank foundation","name":"Visiting Student","endYear":"2009"},{"startYear":"2008","state":"RI","where":"Brown University","childOf":"Undergraduate","name":"Visiting Research Assistant","endYear":"2009","city":"Providence","description":"Autonomous Bidding in Ad Auctions\" - Bidding with a predefined computational strategy, based on artificial intelligence\""}],"childOf":"Education","startYear":"2006","endYear":"2010","name":"Undergraduate"},{"name":"Courses & Certifications","description":"All kind of classes I took","childOf":"Education","children":[{"name":"Cloudera Training for Apache Hadoop","childOf":"Courses & Certifications"},{"childOf":"Courses & Certifications","city":"Berkeley","where":"UC Berkeley","state":"CA","name":"Berkeley Executive Education: Product Management Program"}]}]},{"where":"Israel Defense Forces","children":[{"description":"Composed & translated new course content and monitored the department’s staff","childOf":"Military","endYear":"2003","name":"Staff Sergeant","startYear":"2003"},{"childOf":"Military","description":"Planned and executed soldier training programs. Led a team of 2 commanders and 24 cadets","startYear":"2002","endYear":"2003","name":"Sergeant"},{"endYear":"2002","startYear":"2001","name":"Corporal","description":"Commander and electronics instructor","childOf":"Military"}],"childOf":"Life","startYear":"2000","state":"Israel","description":"Commander & Instructor of Electronics","endYear":"2003","name":"Military"},{"children":[{"children":[{"endYear":"2000","startYear":"1997","name":"R/C Instructor","childOf":"R/C Airplanes","description":"Instructor in the field of radio controlled model airplane"},{"endYear":"2000","name":"R/C Referee","startYear":"1999","childOf":"R/C Airplanes","description":"Refereed in aerial aerobatic competitions"}],"childOf":"Hobbies","description":"I asked for a radio controlled model airplane for my Bar Mitza. That turned to be my main hobby throughout my teenage year","name":"R/C Airplanes","endYear":"2000","startYear":"1994"}],"childOf":"Life","name":"Hobbies"},{"children":[{"childOf":"Languages","description":"Native","name":"Hebrew"},{"name":"English","description":"Fluent","childOf":"Languages"}],"childOf":"Life","name":"Languages"},{"name":"Oh, the Places I Went","childOf":"Life","children":[{"name":"Black Rock City","childOf":"Oh, the Places I Went","description":"Burning Man 2013, 2014 & 2016"},{"name":"United States","children":[{"name":"Nevada","childOf":"United States"},{"name":"Utah","childOf":"United States"},{"name":"Idaho","childOf":"United States"},{"childOf":"United States","name":"Montana"},{"name":"Wyoming","childOf":"United States"},{"childOf":"United States","name":"Colorado"},{"name":"Kansas","childOf":"United States"},{"childOf":"United States","name":"Missouri"},{"childOf":"United States","name":"Illinois"},{"name":"Indiana","childOf":"United States"},{"childOf":"United States","name":"Ohio"},{"childOf":"United States","name":"Pennsylvania"},{"name":"New Jersey","childOf":"United States"},{"childOf":"United States","name":"New York"}],"childOf":"Oh, the Places I Went"},{"childOf":"Oh, the Places I Went","name":"Turkey"},{"childOf":"Oh, the Places I Went","name":"Spain"},{"name":"Greece","childOf":"Oh, the Places I Went"},{"childOf":"Oh, the Places I Went","name":"Thailand"},{"name":"Canada","childOf":"Oh, the Places I Went","children":[{"childOf":"Canada","name":"Toronto"},{"name":"Montreal","childOf":"Canada"}]},{"childOf":"Oh, the Places I Went","name":"Argentina"},{"childOf":"Oh, the Places I Went","name":"Chile"},{"name":"Poland","childOf":"Oh, the Places I Went"}]},{"name":"Homes","childOf":"Life","children":[{"city":"Petakh Tiqva","childOf":"Homes","state":"Israel","name":"Home"},{"childOf":"Homes","city":"Haifa","description":"w/ Daniel","state":"Israel","name":"1st apt"},{"description":"w/ Omry","city":"Haifa","childOf":"Homes","name":"2nd apt","state":"Israel"},{"state":"Israel","name":"Ha'Taverna","childOf":"Homes","city":"Haifa","description":"w/ Amit"},{"childOf":"Homes","city":"Providence","where":"Brown","state":"Rhode Island","name":"GCB"},{"name":"Bosa-Nova","state":"Israel","description":"w/ Eyal","city":"Haifa","childOf":"Homes"},{"city":"Tel Aviv","childOf":"Homes","name":"Ben-Nun","state":"Israel"},{"name":"Shoftim","state":"Israel","childOf":"Homes","city":"Tel Aviv"},{"city":"Tel Aviv","childOf":"Homes","name":"Levinsky","state":"Israel"},{"name":"Noe Valley","state":"California","childOf":"Homes","city":"San Francisco"},{"city":"San Francisco","childOf":"Homes","state":"California","name":"Transylvania"},{"city":"Brooklyn","childOf":"Homes","name":"PSFC","state":"New York"}]}],"endYear":"Present","startYear":"January-23rd 1982","name":"Life"};
//d3.json("/mbostock/raw/4063550/flare.json", function(error, json) {
//  if (error) throw error;
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
//});

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
//   $('#panel').hide()
}

d3.select(window).on("load", function() {
  d3.select("#banner").classed("hide", true);
}
)