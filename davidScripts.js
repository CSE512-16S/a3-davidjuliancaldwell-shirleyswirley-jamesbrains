
var dataset;

var mapFunction = d3.map();

/*    d3.tsv("chemo253.txt", function(data) {
 return {
 RADIUS: +data.RADIUS
 };
 }, function(data){
 dataset = data;
 console.log(dataset[0])
 });*/

//Width and height
var w = 1000;
var h = 1000;


// define the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// set pixel offset for the mouseover
var pxOff = 10;

d3.tsv("chemo253.txt",
    function(data) {

        dataset = data;
        console.log(data[0]);


        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var pathP = svg.selectAll("path")
            .data(dataset)
            .enter()
            .append("path");


        pathP.attr("d", d = "M 8.9807187,91.242928 C 8.4409637,90.913825 7.7512497,90.19014 7.4480217,89.634746 6.9300457,88.686021 6.8916917,86.87726 6.8139777,59.733588 l -0.08271,-28.891349 -0.91354,0 -0.913537,0 0,15.940055 0,15.940054 -0.934841,0 c -1.417843,0 -2.669432,-0.798596 -3.35370502,-2.139881 C 0.02033068,59.415553 -4.2531589e-4,58.798229 3.4684111e-5,42.273049 5.5568411e-4,23.404514 -0.04690532,23.890542 1.9375227,22.434193 c 0.836108,-0.613611 1.282614,-0.638022 13.3344693,-0.729034 8.265853,-0.06242 12.84929,0.01695 13.596323,0.235441 0.619814,0.181283 1.481957,0.751527 1.915872,1.267208 l 0.788941,0.937601 0,17.924266 c 0,15.422024 -0.06491,18.049794 -0.464999,18.823469 -0.498096,0.963218 -1.867101,1.829204 -2.891713,1.829204 -0.625322,0 -0.628301,-0.07563 -0.628301,-15.940054 l 0,-15.940055 -1.072889,0 -1.072888,0 0,28.849614 c 0,28.714451 -0.0031,28.854962 -0.641973,29.991847 -1.745733,3.106118 -5.554484,2.878458 -7.053293,-0.42159 -0.522987,-1.151507 -0.568368,-2.24893 -0.574569,-13.895007 l -0.0067,-12.644755 -0.904222,0 -0.904221,0 -0.09203,12.951295 -0.09203,12.951294 -0.719307,1.156954 c -1.263244,2.031837 -3.540234,2.639657 -5.4732363,1.461037 z m 6.2801393,-70.5549 C 9.4375057,19.824972 5.4302007,13.139086 7.1632157,7.1777241 c 1.05075,-3.614462 3.4109203,-5.956853 6.9036533,-6.85164942 1.688315,-0.4325261 2.053214,-0.4335394 3.705321,-0.010289 3.250036,0.83262042 5.503736,2.72585842 6.963835,5.85002342 0.753514,1.612287 0.859182,2.198573 0.856352,4.7513619 -0.0025,2.303125 -0.137535,3.203856 -0.645465,4.307127 -1.814447,3.941136 -5.589901,6.070803 -9.686054,5.46373 z")
            .attr("stroke-width", 4)
            .attr("stroke", function (d) {
                if (d.CODE_B == '0')
                    return "black";
                else
                    return "black"
            })
            .attr("fill", function (d) {
                //return "rgb(0, 0, " + (+d.TIME_B * 10) + ")";
                //return "rgb(" + (+d.TIME_B * 2  ) + ", " + (+d.TIME_B * 2 ) + ", " + (+d.TIME_B * 2 ) + ")";
                return "white";
            })
            .attr("transform", function (d, i) {
                return "scale(0.4) translate(" + (i % 40) * 40 + "," + Math.floor(i / 40) * 150 + ")";
            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Survival time  " + d.TIME_B + "\n" )
                    .style("left", (d3.event.pageX)+ pxOff + "px" )
                    .style("top", (d3.event.pageY - 28)+ pxOff + "px" );
                /*d3.select(this)
                 .transition()
                 .duration(250)
                 .attr("fill","orange");*/
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                /*d3.select(this)
                 .transition()
                 .duration(200)
                 .attr("fill", "rgb(" + (+d.TIME_B * 2  ) + ", " + (+d.TIME_B * 2 ) + ", " + (+d.TIME_B * 2 ) + ")");*/
            })
            .on("click", function () {
                d3.transition()
                    .duration(500);
                sortBars();
            });


        //Define sort order flag
        var sortOrder = false;

        //Define sort function
        var sortBars = function () {

            //Flip value of sortOrder
            sortOrder = !sortOrder;

            pathP

                .sort(function (a, b) {
                    if (sortOrder) {
                        return d3.ascending(+a.TIME_B, +b.TIME_B);
                    } else {
                        return d3.descending(+a.TIME_B, +b.TIME_B);
                    }
                })
                .transition()
                .delay(function (d, i) {
                    return i * 10;
                })
                .duration(1500)
                .attr("transform", function (d, i) {
                    return "scale(0.4) translate(" + (i % 40) * 40 + "," + Math.floor(i / 40) * 150 + ")";
                })
            ;
        };


        d3.select("#chemo1").on("change", change);
        var highlightOrder = false;

        function change() {
            highlightOrder = !highlightOrder;
            if (highlightOrder) {

                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("stroke", function (d) {
                            if (d.CHEMO == '0')
                                return "green";
                            else {
                                return "black"
                            }

                    })
                    .attr("stroke-width", function (d) {

                            if (d.CHEMO == '0')
                                return 6;
                            else {
                                return 4;
                            }

                    })
                ;
            }
            else{
                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("stroke", "black")
                    .attr("stroke-width",4)
            }



        };

        d3.select("#died").on("change", change2);
        var highlightOrder2 = false;

        function change2() {
            highlightOrder2 = !highlightOrder2;
            if (highlightOrder2) {
                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("stroke", function (d) {

                            if (d.CODE_B == '0')
                                return "cyan";
                            else {
                                return "black"
                            }

                    })
                    .attr("stroke-width", function (d) {

                            if (d.CODE_B == '0')
                                return 6;
                            else {
                                return 4;
                            }

                    })
            }
            else {
                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("stroke", "black")
                    .attr("stroke-width",4)
            }

        };

        d3.select("#survivalTime").on("change", change3);
        var survivalOrder = false;

        function change3() {
            survivalOrder = !survivalOrder;
            if (survivalOrder){
                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("fill", function (d) {
                        //return "rgb(0, 0, " + (+d.TIME_B * 10) + ")";
                        return "rgb(" + (+d.TIME_B * 2  ) + ", " + (+d.TIME_B * 2 ) + ", " + (+d.TIME_B * 2 ) + ")";
                    })
                ;
            }
            else {
                pathP
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(100)
                    .attr("fill","white")
            }
        };
    });