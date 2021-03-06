const surfacePlot = {
  plot: null,

  clickedPoint: {x: 0, y:0, z:0},

  data: [{
    z: [],
    type: 'surface',
    mode: 'lines+markers',
    colorscale: 'Jet',
    showscale: false,
    contours: {
      z: {
        show:true,
        usecolormap: true,          // show colored contour on the bottom
        highlightcolor:"#42f462",
        project:{z: true}
      }
    }
  }],

  layout: {
    //title: 'Nikitos surface',
    width: 400,
    height: 400,

    //autosize: true,

    scene: {
      xaxis:{
        showspikes: true,
        title: 'X'
      },

      yaxis:{
        showspikes: true,
        title: 'Y'
      },

      zaxis:{
        showspikes: true,
        title: 'Z',
        range: [-2,2]
      },

      camera: {
        eye: {
          x: 0,
          y: -2,
          z: 1
        }
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

  },

  trace: {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  },

  init: function (surface) {
    surfacePlot.plot = document.getElementById('surface-plot');

    surfacePlot.data[0].z = surface;
    Plotly.react('surface-plot', surfacePlot.data, surfacePlot.layout,  surfacePlot.config);



    surfacePlot.plot.on('plotly_click', (data) => {
      const x = data.points[0].x;
      const y = data.points[0].y;
      const z = data.points[0].z;
    });

    surfacePlot.plot.on('plotly_doubleclick', function(){});
    surfacePlot.plot.on('plotly_hover', function(){});
    surfacePlot.plot.on('plotly_unhover', function(){});

    document.getElementById("reset-surface-eye-button").addEventListener("click", () => {
      surfacePlot.layout.scene.camera.eye = {x: 0, y: -2, z: 1};
      Plotly.update('surface-plot', surfacePlot.data, surfacePlot.layout,  surfacePlot.config);
    });

    document.getElementById("save-surface-png-button").addEventListener("click", () => {
      Plotly.downloadImage('surface-plot', {format: 'png', width: 800, height: 600, filename: 'newplot'});
    });

    document.getElementById("save-surface-csv-button").addEventListener("click", () => {
      surfaceCutter.downloadCsvAs3D(surfacePlot.data[0].z, "surface.csv")
    });
  },

  getClickedPoint: function() {
    return surfacePlot.clickedPoint;
  },

  getData: function () {
    return surfacePlot.data[0];
  }
};