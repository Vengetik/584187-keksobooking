'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };

})();
// С дебаунсом поспешил, не открыл код после рефакторинга + забыл в хтмл объявить скрипт гг крч.
// Спасибо за честное ревью, *Pressed F to pay respect*.
