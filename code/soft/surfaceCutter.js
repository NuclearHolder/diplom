const surfaceCutter = {
  surface: null,
  point1: null,
  point2: null,

  selectPointButton: null,
  selectPoint1Span: null,
  selectPoint2Span: null,
  resetPointsButton: null,
  cutSurfaceButton: null,

  yAxisRange: null,
  xAxisRange: null,

  init: function() {
    surfaceCutter.selectPointButton = document.getElementById("select-point-button");
    surfaceCutter.selectPoint1Span = document.getElementById("selected-point-1-span");
    surfaceCutter.selectPoint2Span = document.getElementById("selected-point-2-span");
    surfaceCutter.cutSurfaceButton = document.getElementById("cut-surface-button");
    surfaceCutter.yAxisRange = document.getElementById("y-axis-range");
    surfaceCutter.xAxisRange = document.getElementById("x-axis-range");

    surfaceCutter.resetPointsButton = document.getElementById("reset-points-button");

    const surfaceData = surfacePlot.getData();
    surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
    surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;

    surfaceCutter.selectPointButton.addEventListener("click", () => {
      const p = surfacePlot.getClickedPoint();

      if (surfaceCutter.point1 == null) {
        surfaceCutter.point1 = p;
        surfaceCutter.selectPoint1Span.innerHTML = "Point 1: (" + p.x + ", " + p.y + ", " + p.z + ")";
      } else {
        surfaceCutter.point2 = p;
        surfaceCutter.selectPoint2Span.innerHTML = "Point 2: (" + p.x + ", " + p.y + ", " + p.z + ")";
      }
    });

    surfaceCutter.resetPointsButton.addEventListener("click", () => {
      surfaceCutter.point1 = null;
      surfaceCutter.point2 = null;
      surfaceCutter.selectPoint1Span.innerHTML = "Point 1: (x, y, z)";
      surfaceCutter.selectPoint2Span.innerHTML = "Point 2: (x, y, z)";
    });

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