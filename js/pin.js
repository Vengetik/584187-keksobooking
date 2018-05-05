'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template')
      .content.querySelector('button.map__pin');
  var pins = [];
  console.log(pins);
  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = ad.location.x + (window.constant.Pin.WIDTH / 2) + 'px';
    pin.style.top = ad.location.y + window.constant.Pin.HEIGHT + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    return pin;
  };

  var renderPins = function (ad) {
    for (var i = 0; i < ad.length; i++) {
      var newPin = createPin(ad[i]);
      pins.push(newPin);
      fragment.appendChild(newPin);
    }
    mapPins.appendChild(fragment);
  };
  window.pin = {
    create: createPin,
    renderAll: renderPins,
    remove: function () {
      var smallPins = mapPins.querySelectorAll('.map__pin');
      for (var i = 1; i < smallPins.length; i++) {
        smallPins[i].remove();
      }
    },
    getAll: function () {
      return pins;
    }
  };
})();
