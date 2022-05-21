const cutPlotX = {
  plotDivId: 'cut-plot-x',

  config: {
    scrollZoom: true,
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
    doubleClickDelay: 1000
  },

  trace1: {
    y: [],
    type: 'scatter'
  },

  layout: {
    //width: 500,
    height: 200,
    margin: {
      t: 0,
      b: 30,
      l: 30,
      r: 0,
    }
  },

  config: {
    scrollZoom: true,
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
    doubleClickDelay: 1000
  },

  init: function(data) {
    cutPlotX.trace1.y = data;
    const plotData = [cutPlotX.trace1];
    Plotly.newPlot(cutPlotX.plotDivId, plotData, cutPlotX.layout, cutPlotX.config);

    document.getElementById("save-cut-x-png-button").addEventListener("click", () => {
      Plotly.downloadImage(cutPlotX.plotDivId, {format: 'png', width: 800, height: 600, filename: 'newplot'});
    });

    document.getElementById("save-cut-x-csv-button").addEventListener("click", () => {
      surfaceCutter.downloadCsvAs2D(cutPlotX.trace1.y, "x-cut.csv");
    });
  }
};