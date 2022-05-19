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


    surfaceCutter.cutSurfaceButton.addEventListener("click", () => {
      console.log("Cut surface");
    });

    surfaceCutter.yAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
      document.getElementById("y-axis-range-label").innerHTML = "Along the Y axis (" + surfaceCutter.yAxisRange.value + ")";
      cutPlotY.init(surfaceCutter.getCutY(surfaceCutter.yAxisRange.value));
    });

    surfaceCutter.xAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;
      document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + surfaceCutter.xAxisRange.value + ")";

      cutPlotX.init(surfaceCutter.getCutX(surfaceCutter.xAxisRange.value));
    });

  }
};