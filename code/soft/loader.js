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
        arr2.push(loader.getRandomInt(3));
      }

      arr.push(arr2);
    }

    return arr;
  }
}