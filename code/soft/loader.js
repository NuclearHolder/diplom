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
      
      for (let j = 1; j < size; ++j) {
        //arr2.push(j*arr2[j-1]*(1-arr2[j-1]));
        let k = i * Math.random()*2;
        let p = j;
        arr2.push(((Math.sin(2*3.14*k*100))*Math.random()/2)*(Math.sin(2*3.14*p*10)/2*Math.random())*(2/(Math.sin(2*3.14*2/10)+2)));
      }

      arr.push(arr2);
    }

    return arr;
  }
}