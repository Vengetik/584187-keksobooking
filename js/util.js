'use strict';
(function () {
  // optimization func
  window.util = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65,
    MAIN_PIN_TAIL: 18,
    ESC_BUTTON: 27,
    DRAG_LOCATION: {
      xMin: 65,
      xMax: 1200,
      yMin: 150,
      yMax: 700
    },
    URL: 'https://js.dump.academy/keksobooking',
    URL_DATA: 'https://js.dump.academy/keksobooking/data',

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
  };
})();
