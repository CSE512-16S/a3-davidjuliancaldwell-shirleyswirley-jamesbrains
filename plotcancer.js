var types = {
  asterisk: {m: 12, n1: .3, n2: 0, n3: 10, a: 1, b: 1},
  roundedStar: {m: 5, n1: 2, n2: 7, n3: 7, a: 1, b: 1},
  cancer: {m: 10, n1: 6, n2: 6, n3: 7, a: 1, b: 1, s: 1000}
};

var startsize = 10000;

var format = d3.format(".4n");

var scale = d3.scale.linear()
    .domain([-10, 20, 1000])
    .range([0, 800, 1000]);

var sizescale = d3.scale.linear()
    .domain([1000, 100000])
    .range([0, 1000]);

var svg = d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500);

var shape = d3.superformula()
    .type("cancer")
    .size(startsize)
    .segments(3600);

var path = svg.append("path")
    .attr("class", "big")
    .attr("transform", "translate(480,250)")
    .attr("d", shape);

var path2 = svg.append("path")
    .attr("class", "big")
    .attr("transform", "translate(280,150)")
    .attr("d", shape);

var path3 = svg.append("path")
    .attr("class", "big")
    .attr("transform", "translate(680,350)")
    .attr("d", shape);

var control = d3.select("#controls")
  .selectAll("div")
    .data(d3.entries(types.cancer))
  .enter().append("div")
    .attr("id", function(d) { return d.key; });

var sizecontrol = d3.select("#controls")
  .selectAll("div#size").data(d3.entries({size: startsize}))
  .enter().append("div")
    .attr("id", function(d) { return d.key; });

d3.tsv("chemo253.txt", function(c) {return {area: +c.AREA, hormo: +c.HORMO};}, function(d) {
var pc = d3.parcoords()("#example")
  .data(d)
  .render()
  .createAxes();
});

sizecontrol.append("label")
    .text(function(d) { return d.key; });

control.append("label")
    .text(function(d) { return d.key; });

control.append("input")
    .attr("type", "range")
    .attr("max", 1000)
    .attr("min", 0)
    .property("value", function(d) { return scale(d.value); })
    .on("change", changed)
    .on("input", changed);

control.append("span")
    .text(function(d) { return format(d.value); });

sizecontrol.append("input")
    .attr("type", "range")
    .attr("max", 1000)
    .attr("min", 0)
    .property("value", function(d) { return sizescale(d.value); })
    .on("change", changesize)
    .on("input", changesize);

sizecontrol.append("span")
    .text(function(d) { return format(d.value); });

/*
d3.select("#controls")
  .append("div")
  .selectAll("button")
    .data(d3.entries(types))
  .enter().append("button")
    .text(function(d) { return d.key; })
    .on("click", function(d) {
      for (var param in d.value) {
        var control = d3.select("#" + param);
        control.select("input").property("value", scale(d.value[param]));
        control.select("span").text(format(d.value[param]));
        shape.param(param, d.value[param]);
      }
      path.attr("d", shape);
    });
*/

function changed(d) {
  if(d.key == "s") {
    var v = sizescale.invert(this.value);
    path.attr("d", shape.size(v));
    d3.select(this.nextSibling).text(format(v));
  }
  else {
    var v = scale.invert(this.value);
    path.attr("d", shape.param(d.key, v));
    d3.select(this.nextSibling).text(format(v));
  }
}

function changesize(d) {
  var v = sizescale.invert(this.value);
  path.attr("d", shape.size(v));
  d3.select(this.nextSibling).text(format(v));
}