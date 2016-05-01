var controlslides = {
    c1: {s1: 20000, m1: 10},
    c2: {s2: 8000, m2: 10},
    c3: {s3: 1000, m3: 10}
};

// Generate plot 
var scalearea = d3.scale.linear()
    .domain([200, 3500])
    .range([500, 20000]);
var scalefract = d3.scale.linear()
    .domain([0, 0.125])
    .range([0, 30]);

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

var plotCells = function(globalData)
{
    controlslides = pullcelldata(globalData);

    // Create shapes
    
    shape = d3.superformula()
        .type("cancer")
        .size(function(d) {return get_svals(d);} )
        .param("m", function(d) {return get_mvals(d);} )
        .param("n1", function(d) {return 6+((get_mvals(d)-10)/10);} )
        .segments(256);
    
    cancerdispd3 = d3.select("svg#cancerdisp")
        .selectAll("path")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; }))
        .enter();

    cancerdispd3.append("path")
        .attr("class", "big")
        .attr("transform", function(d) {
                return "translate("+
                //(580-d[1]*150)+","+(200+d[1]*100)+
                (200)+","+(130+d[1]*85)+
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

    cancerdispd3.append("text")
        .attr("id", "labeltext")
        .attr("x", function(d) { return 80; })
        .attr("font-family", "sans-serif")
        .attr("y", function(d) {
            return (110+d[1]*85);
            })
        .attr("font-size", "14px")
        .text(function(d) {
            if(d[1] == 0)
                return "+2Z";
            else if(d[1] == 1)
                return "median";
            else if(d[1] == 2)
                return "-2Z";
        });

    cancerdispd3.append("text")
        .attr("id", "dyntext")
        .attr("font-family", "sans-serif")
        .attr("x", function(d) { return 165; })
        .attr("y", function(d) {
            return (130+d[1]*85);
            })
        .attr("font-size", "12px")
        .text(function(d) { return formatcelltext(d, "s")+" | "+formatcelltext(d, "m");
        });
}

function pullcelldata(data_in) {

    marea = d3.median(data_in.map(function(d) {return d.Area}));
    mfract = d3.median(data_in.map(function(d) {return d.Fractal_Dimension}));
    sdarea = d3.median(data_in.map(function(d) {return d.sarea}));
    sdfract = d3.median(data_in.map(function(d) {return d.sfract}));

    return {
        c1: {s1: scalearea(marea+2*sdarea), m1: scalefract(mfract+2*sdfract)},
        c2: {s2: scalearea(marea), m2: scalefract(mfract)},
        c3: {s3: scalearea(marea-2*sdarea), m3: scalefract(mfract-2*sdfract)}
    };
}

var formatcelltext = function(d, type) {
    if(type == "s") {
        format4 = d3.format(".4g");
        return format4(scalearea.invert(get_svals(d)));
    }
    else if(type == "m") {
        format2 = d3.format(".2g");
        return format2(scalefract.invert(get_mvals(d)));
    }
}

function brushchanged(brushdata_in) {
    controlslides = pullcelldata(brushdata_in);

    updatesel = d3.select("svg#cancerdisp")
        .selectAll("path")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; }))

    updatesel.attr("d", shape);

    updatetext = d3.select("svg#cancerdisp")
        .selectAll("text#dyntext")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; }))
            .text(function(d) {
                return formatcelltext(d, "s")+" | "+formatcelltext(d, "m"); })
}

