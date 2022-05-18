const surfaceCutter = {
  surface: null,
  point1: null,
  point2: null,

  cutSurfaceButton: null,

  yAxisRange: null,
  xAxisRange: null,

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
      cutPlot.init(surfaceData.z[surfaceCutter.yAxisRange.value]);
      console.log(surfaceData.z[surfaceCutter.yAxisRange.value])
    });

    surfaceCutter.xAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;
      document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + surfaceCutter.xAxisRange.value + ")";

      let arr = [];
      for (let i = 0; i < surfaceData.z[0].length; ++i) {
        arr[i] = surfaceData.z[i][surfaceCutter.xAxisRange.value];
      }
      cutPlot.init(arr);
    });

  }
};