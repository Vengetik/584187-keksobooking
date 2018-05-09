'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template')
      .content.querySelector('button.map__pin');
  var pins = [];
  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = ad.location.x + (window.constant.Pin.WIDTH / 2) + 'px';
    pin.style.top = ad.location.y + window.constant.Pin.HEIGHT + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    return pin;
  };

  var setListenerToPin = function (pin, ad, callback) {
    pin.addEventListener('click', function () {
      callback(ad);
    });
  };
  var removePins = function () {
    pins.forEach(function (pin) {
      pin.remove();
    });
    pins = [];
  };
  // render pin on map
  var renderPins = function (ads, callback) {
    ads.forEach(function (ad) {
      var pin = createPin(ad);
      pins.push(pin);
      setListenerToPin(pin, ad, callback);
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderAll: renderPins,
    removeAll: removePins,
  };
})();
