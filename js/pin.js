'use strict';
(function () {
  var pinTemplate = document.querySelector('template')
      .content.querySelector('button.map__pin');
  window.pin = {
    create: function (ad) {
      var pin = pinTemplate.cloneNode(true);
      pin.style.left = ad.location.x + (window.const.Pin.WIDTH / 2) + 'px';
      pin.style.top = ad.location.y + window.const.Pin.HEIGHT + 'px';
      pin.querySelector('img').src = ad.author.avatar;
      pin.querySelector('img').alt = ad.offer.title;
      return pin;
    }
  };
})();
