'use strict';
(function () {
  var pinTemplate = document.querySelector('template')
      .content.querySelector('button.map__pin');
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  window.pin = {
    create: function (ad) {
      var pin = pinTemplate.cloneNode(true);
      pin.style.left = ad.location.x + (PIN_WIDTH / 2) + 'px';
      pin.style.top = ad.location.y + PIN_HEIGHT + 'px';
      pin.querySelector('img').src = ad.author.avatar;
      pin.querySelector('img').alt = ad.offer.title;
      return pin;
    }
  };
})();
