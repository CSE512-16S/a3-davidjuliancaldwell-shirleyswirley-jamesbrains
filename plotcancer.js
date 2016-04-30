var controlslides = {
    c1: {s1: 50000, m1: 10},
    c2: {s2: 10000, m2: 10},
    c3: {s3: 5000, m3: 10}
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

var control = d3.select("div#controls")
  .selectAll("div")
    .data(d3.entries(controlslides)
      .map(function(d) { return d3.entries(d.value); })
      .reduce(function(d1, d2) { return d1.concat(d2); })
      )
  .enter().append("div")
    .attr("id", function(d) { return d.key; });

control.append("label")
    .text(function(d) { return d.key; });

control.append("input")
    .attr("type", "range")
    .attr("max", 1000)
    .attr("min", 0)
    .property("value", function(d) {
       if(d.key.indexOf("s") > -1) return scale_s(d.value);
       else if(d.key.indexOf("m") > -1) return scale_m(d.value);
       })
    .on("change", changed)
    .on("input", changed);

control.append("span")
    .text(function(d) { return format(d.value); });

// Create shapes

shape = d3.superformula()
    .type("cancer")
    .size(function(d) { return d3.entries(d[2])
        .map(function(d) {return d.value;})
        .reduce(function(d1, d2) { return d1; } ) }
        )
//    .param(function(d) d3.entries());
    .segments(3600);

d3.select("svg#cancerdisp")
    .selectAll("path")
    .data(d3.entries(controlslides)
        .map(function(d, dind) { return [d.key, dind, d.value]; }))
    .enter()
    .append("path")
        .attr("class", "big")
        .attr("transform", function(d) {
            return "translate("+
            (580-d[1]*150)+","+(200+d[1]*100)+
            ")"
            })
        .attr("id", function(d) {return d[0];})
        .attr("d", shape);

function changed(scrollvalue) {

    /*
    updatesel = d3.select("svg#cancerdisp")
        .selectAll("path")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; })))
            */

    if(scrollvalue.key.indexOf("s") > -1) {
        var v = scale_s.invert(this.value);
      //  updatesel.attr("d", shape.size(v));
    }
    else if(scrollvalue.key.indexOf("m") > .1) {
        var v = scale_m.invert(this.value);
       // path.attr("d", shape.param(d.key, v));
    }

    controlslides["c"+this.key.substr(1)][this.key] = this.value
    d3.select(this.nextSibling).text(format(v));
}
