'use strict';
(function () {
  window.constant = {
    RESPONSE_TIMEOUT: 10000,
    XHR_DONE_STATUS: 200,
    Pin: {
      HEIGHT: 70,
      WIDTH: 50,
      MAX_NUMBER: 5
    },
    MainPin: {
      WIDTH: 65,
      HEIGHT: 65,
      TAIL: 18
    },
    MainPinStartCoord: {
      X: 570,
      Y: 375
    },
    Button: {
      ESC: 27,
      ENTER: 13,
      SPACE: 32
    },
    DragField: {
      X_MIN: 65,
      X_MAX: 1200,
      Y_MIN: 150,
      Y_MAX: 700
    },
    Url: {
      UPLOAD: 'https://js.dump.academy/keksobooking',
      DATA: 'https://js.dump.academy/keksobooking/data',
    },
    Price: {
      LOW: 10000,
      HIGH: 50000
    },
    Room: {
      ONE: 1,
      TWO: 2,
      THREE: 3
    },
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png', 'ico'],
    Image: {
      WIDTH: '65',
      HEIGHT: '60',
      ALT: 'Фото жилья',
      MARGIN: '3px',
    }

  };
})();
