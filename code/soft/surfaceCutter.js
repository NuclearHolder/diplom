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
    //surfaceCutter.cutSurfaceButton = document.getElementById("cut-surface-button");
    surfaceCutter.yAxisRange = document.getElementById("y-axis-range");
    surfaceCutter.xAxisRange = document.getElementById("x-axis-range");

    surfaceCutter.resetPointsButton = document.getElementById("reset-points-button");

    const surfaceData = surfacePlot.getData();
    surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
    surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;

    // "Set cut" button handler, set cut params to X and Y intersections
    /*surfaceCutter.cutSurfaceButton.addEventListener("click", () => {
      surfaceCutter.setXY(contourPlot.clickedPoint.x, contourPlot.clickedPoint.y)
    });*/

    // Horizontal range INPUT event handler, intersection Y
    surfaceCutter.yAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.yAxisRange.max = surfaceData.z.length - 1;
      surfaceCutter.setY(surfaceCutter.yAxisRange.value);
    });

    // Horizontal range INPUT event handler, intersection X
    surfaceCutter.xAxisRange.addEventListener("input", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;
      surfaceCutter.setX(surfaceCutter.xAxisRange.value);
    });

    // Decrease intersection Y button handler
    document.getElementById("y-axis-range-left-button").addEventListener("click", (data) => {
      if (surfaceCutter.yAxisRange.value > 0) {
        --surfaceCutter.yAxisRange.value;
      }

      surfaceCutter.setY(surfaceCutter.yAxisRange.value);
    });

    // Increase intersection Y button handler
    document.getElementById("y-axis-range-right-button").addEventListener("click", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.yAxisRange.max = surfaceData.z[0].length - 1;

      if (surfaceCutter.yAxisRange.value < surfaceCutter.yAxisRange.max) {
        ++surfaceCutter.yAxisRange.value;
      }

      surfaceCutter.setY(surfaceCutter.yAxisRange.value);
    });

    document.getElementById("x-axis-range-left-button").addEventListener("click", (data) => {
      if (surfaceCutter.xAxisRange.value > 0) {
        --surfaceCutter.xAxisRange.value;
      }

      surfaceCutter.setX(surfaceCutter.xAxisRange.value);
    });

    document.getElementById("x-axis-range-right-button").addEventListener("click", (data) => {
      const surfaceData = surfacePlot.getData();
      surfaceCutter.xAxisRange.max = surfaceData.z[0].length - 1;

      if (surfaceCutter.xAxisRange.value < surfaceCutter.xAxisRange.max) {
        ++surfaceCutter.xAxisRange.value;
      }

      surfaceCutter.setX(surfaceCutter.xAxisRange.value);
    });
  },

  downloadCsvAs3D: function(arr, filename) {
    let str = "y;x;z\n";
    for (let y = 0; y < arr.length; ++y) {
      for (let x = 0; x < arr.length; ++x) {
        console.log(arr[y][x]);
        str += y.toString() + "; " + x.toString() + "; " + arr[y][x].toString() + "\n";
      }
    }

    surfaceCutter.downloadBlob(str, filename, "ext/csv;charset=utf-8;");
  },

  downloadCsvAs2D: function(arr, filename) {

    let str = "x;y\n";

    for (let i = 0; i < arr.length; ++i) {
      str += i.toString() + "; " +  arr[i].toString() + "\n";
    }

    surfaceCutter.downloadBlob(str, filename, "ext/csv;charset=utf-8;");
  },

  downloadBlob: function(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  },

  // Global apply new 'x' and 'y' coordinates
  setXY: function(x, y) {
    surfaceCutter.setX(x);
    surfaceCutter.setY(y);
  },

  // Global apply new 'x' coordinate
  setX: function(x) {
    document.getElementById("x-axis-range-label").innerHTML = "Along the X axis (" + x + ")";
    surfaceCutter.xAxisRange.value = x;
    cutPlotX.init(surfaceCutter.getCutX(x));
  },

  // Global apply new 'y' coordinate
  setY: function(y) {
    document.getElementById("y-axis-range-label").innerHTML = "Along the Y axis (" + y + ")";
    surfaceCutter.yAxisRange.value = y;
    cutPlotY.init(surfaceCutter.getCutY(y));
  }
};