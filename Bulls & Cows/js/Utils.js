var Utils =  {
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  gotSameColor: function (a, b) {
    var res = 0,
        tmpArr = a.slice(),
        index,
        i;
    for(i = 0; i < b.length; i++) {
      index = a.indexOf(b[i]);
      if(~index) {
        res++;
        a[index] = undefined;
      }
    }
    return res;
  },

  gotSameColorAndPosition: function (a, b) {
    return a.reduce(function(res, elem, index) {
       return elem === b[index] ? ++res : res;
    }, 0);
  },

  haveUndefinedElements: function (array, length) {
    var i;
    for(i = 0; i < length; i++) {
      if(array[i] === undefined) {
        return true;
      }
    }
    return false;
  }
};