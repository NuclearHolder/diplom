const rescaner = {

  getSnapshot: function() {
    console.log("call getSnapshot");
    Plotly.toImage("contour-plot", {"format": "png"}).then(function(url) {
      console.log(url);
      $("#contour-plot-image").attr("src", url);
    });
  },

  getScreenshot: function() {
    console.log("call getScreenshot");
    rescaner.getScreenshotOfElement($("#contour-plot").get(0), 0, 0, 100, 100, (data) => {
      $("#contour-plot-image").attr("src", "data:image/png;base64," + data);
    });
  },

  getScreenshotOfElement: function(element, posX, posY, width, height, callback) {
    html2canvas(element, {
        onrendered: function (canvas) {
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(posX, posY, width, height).data;
            var outputCanvas = document.createElement('canvas');
            var outputContext = outputCanvas.getContext('2d');
            outputCanvas.width = width;
            outputCanvas.height = height;

            var idata = outputContext.createImageData(width, height);
            idata.data.set(imageData);
            outputContext.putImageData(idata, 0, 0);
            callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
        },
        width: width,
        height: height,
        useCORS: true,
        taintTest: false,
        allowTaint: false
    });
  }
}