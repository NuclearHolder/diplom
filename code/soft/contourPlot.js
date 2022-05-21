const contourPlot = {
  plot: null,
  clickedPoint: {},
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
  },
  {
    x: [1],
    y: [3],
    //mode: 'markers+text',
    marker:{
      size: '16',
      color: 'white',

      /*line: {
        color: 'rgb(255, 255, 255)',
        width: 3
      },*/
      //symbol: "diamond-open-dot"

    },

    //text: "Hello",
    //textposition: 'bottom right'
  }],

  layout: {
    //title: 'Nikitos surface',
    //width: 500,
    height: 400,


    xaxis:{
      title: 'X',
      autorange: true
    },

    yaxis:{
      title: 'Y',
      autorange: true
    },

    margin: {
      t: 0,
      b: 50,
      l: 50,
      r: 0,
    },

    shapes: [
      {
        type: 'line',
        y0: 3,
        y1: 3,
        x0: 0,
        x1: 4,

        line: {
          color: 'white',
          width: 1.5,
          dash: 'dot'
        }
      },
      {
        type: 'line',
        y0: 0,
        y1: 4,
        x0: 1,
        x1: 1,

        line: {
          color: 'white',
          width: 1.5,
          dash: 'dot'
        }
      }
    ]
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
      console.log(data);
      contourPlot.clickedPoint = data.points[0];
      const x = data.points[0].x;
      const y = data.points[0].y;
      const z = data.points[0].z;
      contourPlot.clickedPointSpan.innerHTML = "Clicked point (" + x + ", " + y + ", " + z + ")";
    });

    contourPlot.plot.on('plotly_relayout', (data) => {
      console.log(data);
    });

    document.getElementById("save-contour-png-button").addEventListener("click", () => {
      Plotly.downloadImage('contour-plot', {format: 'png', width: 800, height: 600, filename: 'newplot'});
    });

    document.getElementById("save-contour-csv-button").addEventListener("click", () => {
      alert("Этот функционал еще не реализован!\n Никита !!!\n Ждать! Ждать!");
    });

    document.getElementById("reset-contour-eye-button").addEventListener("click", () => {
      contourPlot.layout.xaxis.autorange = true;
      contourPlot.layout.yaxis.autorange = true;
      Plotly.update('contour-plot', contourPlot.data, contourPlot.layout,  contourPlot.config);
    });
  }
};