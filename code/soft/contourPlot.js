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

    colorbar: { dtick: 0.1 }
  },
  {
    x: [1],
    y: [3],
    marker:{ size: '16', color: 'white' }
  }],

  layout: {
    height: 400,

    hoverinfo: 'none', // not works

    annotations: [
      {
        x: 1,
        y: 3,
        xref: 'x',
        yref: 'y',
        text: '(1, 3)',
        showarrow: true,
        font: {
          family: 'Courier New, monospace',
          size: 16,
          color: 'white'
        },
        align: 'center',
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'black',
        ax: 20,
        ay: -30,
        bordercolor: 'white',
        borderwidth: 2,
        borderpad: 4,
        bgcolor: 'black',
        //opacity: 0.8
      }
    ],


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
      contourPlot.clickedPoint = data.points[0];
      const x = data.points[0].x;
      const y = data.points[0].y;
      const z = data.points[0].z;
      contourPlot.clickedPointSpan.innerHTML = "Clicked point (" + x + ", " + y + ", " + z + ")";

      contourPlot.setMarker(x, y);
      surfaceCutter.setXY(x, y);
    });

    contourPlot.plot.on('plotly_relayout', (data) => {
      //console.log(data);
    });

    document.getElementById("save-contour-png-button").addEventListener("click", () => {
      Plotly.downloadImage('contour-plot', {format: 'png', width: 800, height: 600, filename: 'newplot'});
    });

    /*document.getElementById("save-contour-csv-button").addEventListener("click", () => {
      alert("Этот функционал еще не реализован!\n Никита !!!\n Ждать! Ждать!");
    });*/

    document.getElementById("reset-contour-eye-button").addEventListener("click", () => {
      contourPlot.layout.xaxis.autorange = true;
      contourPlot.layout.yaxis.autorange = true;
      Plotly.update('contour-plot', contourPlot.data, contourPlot.layout,  contourPlot.config);
    });
  },

  // Draw marker on the contour plot
  setMarker: function(x, y) {
    // Set circle
    contourPlot.data[1].x[0] = x;
    contourPlot.data[1].y[0] = y;

    // Set rectangle annotation
    contourPlot.layout.annotations[0].x = x;
    contourPlot.layout.annotations[0].y = y;
    contourPlot.layout.annotations[0].text = "(" + x + ", " + y + ")"

    // Set horizontal dot line
    contourPlot.layout.shapes[0].y0 = y;
    contourPlot.layout.shapes[0].y1 = y;
    contourPlot.layout.shapes[0].x0 = 0;
    contourPlot.layout.shapes[0].x1 = surfacePlot.getData().z.length - 1; // TODO: surfacePlot.getMax()

    // Set vertical dot line
    contourPlot.layout.shapes[1].x0 = x;
    contourPlot.layout.shapes[1].x1 = x;
    contourPlot.layout.shapes[1].y0 = 0;
    contourPlot.layout.shapes[1].y1 = surfacePlot.getData().z.length - 1; // TODO: surfacePlot.getMax()

    Plotly.update('contour-plot', contourPlot.data, contourPlot.layout,  contourPlot.config);
  }
};