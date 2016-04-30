var controlslides = {
    c1: {s1: 50000, m1: 10},
    c2: {s2: 10000, m2: 10},
    c3: {s3: 5000, m3: 10}
};

// Generate plot 

var plotCells = function(globalData)
{
    controlslides = pullcelldata(globalData);

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
                //(580-d[1]*150)+","+(200+d[1]*100)+
                (200)+","+(200+d[1]*125)+
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

function pullcelldata(data_in) {
    var scalearea = d3.scale.linear()
        .domain([200, 3500])
        .range([500, 50000]);
    var scalefract = d3.scale.linear()
        .domain([0, 0.125])
        .range([0, 30]);

    marea = d3.median(data_in.map(function(d) {return d.area}));
    mfract = d3.median(data_in.map(function(d) {return d.fract}));
    sdarea = d3.median(data_in.map(function(d) {return d.sarea}));
    sdfract = d3.median(data_in.map(function(d) {return d.sfract}));

    return {
        c1: {s1: scalearea(marea+2*sdarea), m1: scalefract(mfract+2*sdfract)},
        c2: {s2: scalearea(marea), m2: scalefract(mfract)},
        c3: {s3: scalearea(marea-2*sdarea), m3: scalefract(mfract-2*sdfract)}
    };
}

function brushchanged(brushdata_in) {
    controlslides = pullcelldata(brushdata_in);

    updatesel = d3.select("svg#cancerdisp")
        .selectAll("path")
        .data(d3.entries(controlslides)
            .map(function(d, dind) { return [d.key, dind, d.value]; }))

    updatesel.attr("d", shape);
}

