// color-scale for z-scores
var zcolorscale = d3.scale.linear()
  .domain([-2,-0.5,0.5,2])
  .range(["brown", "#999", "#999", "steelblue"])
  .interpolate(d3.interpolateLab);

// load csv file and create the chart
var areaavg;
var fract_davg;

var plotparcoords = function(subset_of_data)
{
    console.log(subset_of_data)
  // ------------
  // PARALLEL COORDINATES
  pc1 = d3.parcoords()("#pc1")
    .data(subset_of_data)
    .alpha(1)
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
    var areasum = 0;
    var fract_dsum = 0;
    var data1 = d3.nest()
      .key(function(d) {
        return d.AREA;
      })
      .rollup(function(d) {
        return d3.sum(d, function(g) {
          areasum += +g.area;
          fract_dsum += +g.fract;
        })
      }).entries(d);
    areaavg = areasum / d.length;
    fract_davg = fract_dsum / d.length;
    
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
