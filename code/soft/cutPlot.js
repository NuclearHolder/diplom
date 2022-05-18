const cutPlot = {
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
    height: 250,
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
    cutPlot.trace1.y = data;
    const plotData = [cutPlot.trace1];
    Plotly.newPlot('chart3', plotData, cutPlot.layout, cutPlot.config);
  }
};