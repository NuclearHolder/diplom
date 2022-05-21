const calibration = {
  progressValue: 0,
  progressInterval: null,

  init: function() {
    calibration.setView("init");

    $("#auto-calibration-modal").click(() => {
      calibration.setView("processing");

      calibration.progressValue = 0;
      calibration.progressInterval = setInterval(() => {
        if (calibration.progressValue < 100) {
          calibration.progressValue += 1;
          $("#calib-progress").css("width", calibration.progressValue + "%");
        } else {
          clearInterval(calibration.progressInterval);
          calibration.setView("finished");
          setTimeout(() => {
            calibration.setView("init");
          }, 4000);
        }
      }, 100);
    });
  },

  setView: function(view) {
    $("#start-calibration-init-state").hide();
    $("#start-calibration-process-state").hide();
    $("#calibration-finished-state").hide();

    switch(view) {
      case "init": {
        $("#start-calibration-init-state").show();
        break;
      }

      case "processing": {
        $("#start-calibration-process-state").show();
        break;
      }

      case "finished": {
        $("#calibration-finished-state").show();
        break;
      }
    }
  }
};