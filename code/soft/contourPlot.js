const contourPlot = {
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
    }
  }],

  layout: {
    //title: 'Nikitos surface',
    //width: 500,
    height: 400,

    scene: {
      xaxis:{
        showspikes: true,
        title: 'X AXIS TITLE'
      },

      yaxis:{
        showspikes: true,
        //automargin: true,
        title: 'Y AXIS TITLE'
      },

      zaxis:{
        showspikes: true,
        title: 'Z AXIS TITLE'
      }
    },

    margin: {
      t: 0,
      b: 0,
      l: 0,
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
    contourPlot.data[0].z = surface;
    Plotly.react('chart2', contourPlot.data, contourPlot.layout,  contourPlot.config);
  }
};