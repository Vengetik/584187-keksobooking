'use strict';
(function () {
  // optimization func
  window.util = {
    shuffleArray: function (someArray) {
      return someArray.sort(function () {
        return Math.random() - 0.5;
      });
    },
    getRandomArrayElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
    getRandomValue: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    isMapActive: function () {
      return window.domVariables.mapBlock.classList.contains('map--faded');
    }
  };
})();
