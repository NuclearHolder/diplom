const cutPlotY = {
  plotDivId: 'cut-plot-y',

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
    cutPlotY.trace1.y = data;
    const plotData = [cutPlotY.trace1];
    Plotly.newPlot(cutPlotY.plotDivId, plotData, cutPlotY.layout, cutPlotY.config);

    document.getElementById("save-cut-y-png-button").addEventListener("click", () => {
      Plotly.downloadImage(cutPlotY.plotDivId, {format: 'png', width: 800, height: 600, filename: 'newplot'});
    });
  }
};