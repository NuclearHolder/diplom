const contourPlot = {
  plot: null,
  clickedPointSpan: null,

  data: [{
    z: [],
    type: 'contour',
    colorscale: 'Jet',                  // https://plotly.com/javascript/colorscales/#hot-colorscale
    contours: {
      z: {
        show:true,
        usecolormap: true,
        highlightcolor:"#42f462",
        project:{z: true}
      },
      coloring: 'heatmap',
      showlabels: true,
      labelfont: {
        family: 'Raleway',
        size: 12,
        color: 'white',
      }
    },

    xaxis: 'x1',
    yaxis: 'y1',

    colorbar: {
      dtick: 0.1
    }
  }],

  layout: {
    //title: 'Nikitos surface',
    //width: 500,
    height: 400,


    xaxis:{
      title: 'X'
    },

    yaxis:{
      title: 'Y'
    },

    margin: {
      t: 0,
      b: 50,
      l: 50,
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


  init: function(surface) {
    contourPlot.plot = document.getElementById('contour-plot');
    contourPlot.clickedPointSpan = document.getElementById("click-point-span");

    contourPlot.data[0].z = surface;
    Plotly.react('contour-plot', contourPlot.data, contourPlot.layout,  contourPlot.config);

    contourPlot.plot.on('plotly_click', (data) => {
      const x = data.points[0].x;
      const y = data.points[0].y;
      const z = data.points[0].z;

      contourPlot.clickedPointSpan.innerHTML = "Clicked point (" + x + ", " + y + ", " + z + ")";
    });
  }
};