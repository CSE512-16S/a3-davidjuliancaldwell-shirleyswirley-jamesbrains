var controlslides = {
    c1: {s1: 50000, m1: 10},
    c2: {s2: 10000, m2: 10},
    c3: {s3: 5000, m3: 10}
};

// Create controls

var scale_m = d3.scale.linear()
    .domain([0, 20, 40])
    .range([0, 800, 1000]);

var scale_s = d3.scale.linear()
    .domain([1000, 100000])
    .range([0, 1000]);

var format = d3.format(".2g");

// Generate plot 

var plotCells = function()
{
    
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
    
    function get_svals(d) {
        return d3.entries(d[2])
            .map(function(d) {return d.value;})
            .reduce(function(d1, d2) { return d1; } )
    }
    function get_mvals(d) {
        return d3.entries(d[2])
            .map(function(d) {return d.value;})
            .reduce(function(d1, d2) { return d2; } )
    }
    
    shape = d3.superformula()
        .type("cancer")
        .size(function(d) {return get_svals(d);} )
        .param("m", function(d) {return get_mvals(d);} )
        .param("n1", function(d) {return 6+((get_mvals(d)-10)/10);} )
        .segments(256);
    
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
            .attr("d", shape)
            .style("fill", function(d) {
                if(d[1] == 0 || d[1] == 2)
                    return "#FFE9DE";
            })
            .style("stroke", function(d) {
                if(d[1] == 0 || d[1] == 2)
                    return "#FFE8E8";
            })
}

function changed(d) {

    updatesel = d3.select("svg#cancerdisp")
        .selectAll("path")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; }))

    if(d.key.indexOf("s") > -1) {
        var v = scale_s.invert(this.value);
    }
    else if(d.key.indexOf("m") > -1) {
        var v = scale_m.invert(this.value);
    }

    controlslides["c"+d.key.substr(1)][d.key] = v;
    updatesel.attr("d", shape);
    d3.select(this.nextSibling).text(format(v));
}
