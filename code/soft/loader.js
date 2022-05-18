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
      //arr.push(Array(size).fill().map(()=>loader.getRandomFloat()));
      arr.push(Array(size).fill().map(()=>loader.getRandomInt(3)));
    }

    return arr;
  }
}