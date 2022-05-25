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
        arr2.push(((Math.sin((i/2)*100))*Math.random()*2)*(Math.sin(j/10)*Math.random())*(Math.sin(i*j+10)+10));
      }

      arr.push(arr2);
    }

    return arr;
  }
}