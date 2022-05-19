const surfaceCutter = {
  surface: null,
  point1: null,
  point2: null,

  cutSurfaceButton: null,

  yAxisRange: null,
  xAxisRange: null,

  getCutY: function(index) {
    return surfacePlot.getData().z[index];
  },

  getCutX: function(index) {
    const surfaceData = surfacePlot.getData();

    let arr = [];
    for (let i = 0; i < surfaceData.z[0].length; ++i) {
      arr[i] = surfaceData.z[i][index];
    }

    return arr;
  },

  init: function() {
    surfaceCutter.cutSurfaceButton = document.getElementById("cut-surface-button");
    surfaceCutter.yAxisRange = document.getElementById("y-axis-range");
    surfaceCutter.xAxisRange = document.getElementById("x-axis-range");

    surfaceCutter.resetPointsButton = document.getElementById("reset-points-button");

    const surfaceData = surfacePlot.getData();
    surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
    surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;

    // "Set cut" button handler, set cut params to X and Y intersections
    surfaceCutter.cutSurfaceButton.addEventListener("click", () => {
      if (contourPlot.clickedPoint.x === undefined || contourPlot.clickedPoint.y === undefined) {
        alert("Not selected clicked point!\nClick on contour plot first!");
        return;
      }

      cutPlotX.init(surfaceCutter.getCutX(contourPlot.clickedPoint.x));
      cutPlotY.init(surfaceCutter.getCutY(contourPlot.clickedPoint.y));
    });

    // Horizontal range INPUT event handler, intersection Y
    surfaceCutter.yAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
      document.getElementById("y-axis-range-label").innerHTML = "Along the Y axis (" + surfaceCutter.yAxisRange.value + ")";
      cutPlotY.init(surfaceCutter.getCutY(surfaceCutter.yAxisRange.value));
    });

    // Horizontal range INPUT event handler, intersection X
    surfaceCutter.xAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;
      document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + surfaceCutter.xAxisRange.value + ")";
      cutPlotX.init(surfaceCutter.getCutX(surfaceCutter.xAxisRange.value));
    });

    // Decrease intersection Y button handler
    document.getElementById("y-axis-range-left-button").addEventListener("click", (data) => {
      if (surfaceCutter.yAxisRange.value > 0) {
        --surfaceCutter.yAxisRange.value;
      }

      document.getElementById("y-axis-range-label").innerHTML = "Along the Y axis (" + surfaceCutter.yAxisRange.value + ")";
      cutPlotY.init(surfaceCutter.getCutY(surfaceCutter.yAxisRange.value));
    });

    // Increase intersection Y button handler
    document.getElementById("y-axis-range-right-button").addEventListener("click", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.yAxisRange.max = surfaceData.z[0].length - 1;

      if (surfaceCutter.yAxisRange.value < surfaceCutter.yAxisRange.max) {
        ++surfaceCutter.yAxisRange.value;
      }

      document.getElementById("y-axis-range-label").innerHTML = "Along the Y axis (" + surfaceCutter.yAxisRange.value + ")";
      cutPlotY.init(surfaceCutter.getCutY(surfaceCutter.yAxisRange.value));
    });

    document.getElementById("x-axis-range-left-button").addEventListener("click", (data) => {
      if (surfaceCutter.xAxisRange.value > 0) {
        --surfaceCutter.xAxisRange.value;
      }

      document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + surfaceCutter.xAxisRange.value + ")";
      cutPlotX.init(surfaceCutter.getCutX(surfaceCutter.xAxisRange.value));
    });

    document.getElementById("x-axis-range-right-button").addEventListener("click", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;

      if (surfaceCutter.xAxisRange.value < surfaceCutter.xAxisRange.max) {
        ++surfaceCutter.xAxisRange.value;
      }

      document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + surfaceCutter.xAxisRange.value + ")";
      cutPlotX.init(surfaceCutter.getCutX(surfaceCutter.xAxisRange.value));
    });
  }
};