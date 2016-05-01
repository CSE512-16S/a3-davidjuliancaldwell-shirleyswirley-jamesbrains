// color-scale for z-scores
var zcolorscale = d3.scale.linear()
  .domain([-2,-0.5,0.5,2])
  .range(["brown", "#999", "#999", "steelblue"])
  .interpolate(d3.interpolateLab);

// load csv file and create the chart
var areaavg;
var fract_davg;

var plotparcoords = function(subset_of_data, hide_these_axes)
{
  // console.log(subset_of_data)
  // ------------
  // PARALLEL COORDINATES
  pc1 = d3.parcoords()("#pc1")
    .data(subset_of_data)
    .hideAxis(hide_these_axes)
    .alpha(.75)
    .render()
    .reorderable()
    .brushMode("1D-axes")
    .interactive()

  // default z-score colored according to the following variable
  change_color("area");

  // update on brush event
  // click label to activate coloring
  pc1.svg.selectAll(".dimension")
    .on("click", change_color)
    .selectAll(".label")

  // calculate means on brushed data
  pc1.on("brush",function(d) {

    brushchanged(d); // use this brush to update James's plot
     // use this to update David's plot
    plotPatients(d);
  });

}

// ------------

// fxn to update color
function change_color(dimension) { 
  pc1.svg.selectAll(".dimension")
    .style("font-weight", "normal")
    .filter(function(d) { return d == dimension; })
    .style("font-weight", "bold")

  pc1.color(zcolor(pc1.data(),dimension)).render()
}

// fxn to return color function based on plot and dimension
function zcolor(col, dimension) {
  var z = zscore(_(col).pluck(dimension).map(parseFloat))
  return function(d) { return zcolorscale(z(d[dimension])) }
};

// fxn to color by zscore
function zscore(col) {
  var n = col.length,
      mean = _(col).mean(),
      sigma = _(col).stdDeviation();
  return function(d) {
    return (d-mean)/sigma;
  };
};
