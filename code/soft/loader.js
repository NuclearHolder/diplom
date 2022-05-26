var loader = {
  getRandomInt: function (max) {
    return Math.floor(Math.random() * max);
  },

  getRandomFloat: function () {
    return Math.random();
  },

  generateData: function (size) {
    let arr = [];

    let con = 2*3.14;
    let freq1 = 100;
    let f1 = 1/freq1;
    let Omega1 = 5;
    let A1 = 1;

    let freq2 = 200;
    let f2 = 1/freq2;
    let Omega2 = 10;
    let A2 = 1;

    let freq3 = 100;
    let f3 = 1/freq3;
    let Omega3 = 0;
    let A3 = 0.2;

    let A4 = 1/1000;
    let S4 = 0.4;

    let inv = 60;
    for (let i = 0; i < size; ++i) {
      let arr2 = [];
      inv = inv - 1;
      for (let j = 0; j < size; ++j) {
        let noise1 = Math.random() / 2;
        let fun1 = A1 * Math.sin(con*f1*i + Omega1) * noise1;
        let fun2 = A2 * Math.sin(con*f2*i + Omega2);
        let fun3 = A3 * Math.sin(con*f3*j + Omega3);

        let sqrt1 = i * i;

        let sqrt2 = inv * inv;

        let fun4 = (S4 + Math.exp(-(A4*(i*i))));
        let fun5 = -(Math.exp(-(A4*(sqrt2))));

        let fun12 = fun1 * fun2;

        let fun12fun3 = fun12 + fun3;

        let fun12fun3fun4 = fun4 * fun12fun3;

        let fun45 = fun5 + fun4;

        let fun12fun3fun45 = fun45 + fun12fun3;

        arr2.push(fun12fun3fun4);

      }

      arr.push(arr2);
    }

    return arr;
  },

  init: function() {
    $("#select-file-input").change(function(e) {
      $("#file-select-window").addClass("d-none");
      $("#work-window").removeClass("d-none");
    });
  }
}