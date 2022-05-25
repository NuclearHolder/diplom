var loader = {
  getRandomInt: function (max) {
    return Math.floor(Math.random() * max);
  },

  getRandomFloat: function () {
    return Math.random();
  },

  generateData: function (size) {
    let arr = [];

    for (let i = 0; i < size; ++i) {
      let arr2 = [];

      for (let j = 0; j < size; ++j) {
        arr2.push((Math.sin(i*0.5)+2)*Math.random());
      }

      arr.push(arr2);
    }

    return arr;
  }
}