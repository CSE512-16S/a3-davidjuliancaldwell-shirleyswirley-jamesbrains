var controlslides = {
    m1_s: 1000, m1_m: 10,
    m2_s: 10000, m2_m: 10,
    m3_s: 100000, m3_m: 10
};
/*
  cancer: {m: 10, n1: 6, n2: 6, n3: 7, a: 1, b: 1, s: 1000}
*/

// Create controls

var scale_m = d3.scale.linear()
    .domain([-10, 20, 1000])
    .range([0, 800, 1000]);

var scale_s = d3.scale.linear()
    .domain([1000, 100000])
    .range([0, 1000]);

var format = d3.format("g");

var control = d3.select("#controls")
  .selectAll("div")
  .data(d3.entries(controlslides))
  .enter().append("div")
    .attr("id", function(d) { return d.key; });

control.append("label")
    .text(function(d) { return d.key; });

control.append("input")
    .attr("type", "range")
    .attr("max", 1000)
    .attr("min", 0)
    .property("value", function(d) {
       if(d.key.indexOf("_s") > -1) return scale_s(d.value);
       else if(d.key.indexOf("_m") > -1) return scale_m(d.value);
       })
    .on("change", changed)
    .on("input", changed);

control.append("span")
    .text(function(d) { return format(d.value); });

var svg = d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500);

var shape = d3.superformula()
    .type("cancer")
    .size(controlslides.m1.s)
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
    var v = scale_s.invert(this.value);
    path.attr("d", shape.param(d.key, v));
    d3.select(this.nextSibling).text(format(v));
  }
}

function changesize(d) {
  var v = sizescale.invert(this.value);
  path.attr("d", shape.size(v));
  d3.select(this.nextSibling).text(format(v));
}
