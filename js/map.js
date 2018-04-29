'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  // render pin on map
  var offers = window.offers.create();
  var renderPins = function (ad) {
    for (var i = 0; i < ad.length; i++) {
      var pin = window.pin.create(ad[i]);
      setListenerToPin(pin, ad[i]);
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  // added listener on click for pin
  var setListenerToPin = function (pin, ad) {
    pin.addEventListener('click', function () {
      removeCard();
      renderCard(ad);
    });
  };

  var renderCard = function (cardOffer) {
    var card = window.card.create(cardOffer);
    var popupCrossElement = card.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    popupCrossElement.addEventListener('click', onCrossClick);
    mapBlock.insertBefore(card, mapBlock.children[3]);
  };

  // Close card cross listener
  var onCrossClick = function () {
    removeCard();
  };
  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_BUTTON) {
      removeCard();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };
  // Close card pin listener
  var removeCard = function () {
    var mapCardElement = mapBlock.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
    }
  };
  var isMapActive = function () {
    return mapBlock.classList.contains('map--faded');
  };

  var getMainPinCoords = function () {
    var x = parseInt(mainMapPin.style.left, 10) + window.util.MAIN_PIN_WIDTH / 2;
    var y = isMapActive() ?
      parseInt(mainMapPin.style.top, 10) +
      window.util.MAIN_PIN_HEIGHT / 2 :
      parseInt(mainMapPin.style.top, 10) +
      window.util.MAIN_PIN_HEIGHT + window.util.MAIN_PIN_TAIL;
    return {
      x: x,
      y: y
    };
  };
  var coords = getMainPinCoords();
  window.form.fillAddress(coords.x, coords.y);
  window.form.toggle();
  var activatePage = function () {
    mapBlock.classList.remove('map--faded'); //  Removed map faded
    window.form.toggle();
    var activeCoords = getMainPinCoords();
    window.form.fillAddress(activeCoords.x, activeCoords.y);
  };
  mainMapPin.addEventListener('mouseup', function onMainPinDrop() {
    renderPins(offers);
    activatePage();
    mainMapPin.removeEventListener('mouseup', onMainPinDrop);
  });

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var starCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var moveCoords = getMainPinCoords();
      var shift = {
        x: starCoords.x - moveEvt.clientX,
        y: starCoords.y - moveEvt.clientY
      };
      var newY = mainMapPin.offsetTop - shift.y;
      var newX = mainMapPin.offsetLeft - shift.x;
      if (
        newY >= window.util.DRAG_LOCATION.yMin - window.util.MAIN_PIN_HEIGHT &&
        newY <= window.util.DRAG_LOCATION.yMax - (window.util.MAIN_PIN_HEIGHT + window.util.MAIN_PIN_TAIL) &&
        newX >= window.util.DRAG_LOCATION.xMin - window.util.MAIN_PIN_WIDTH &&
        newX <= window.util.DRAG_LOCATION.xMax - window.util.MAIN_PIN_WIDTH) {
        starCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        mainMapPin.style.top =
          (mainMapPin.offsetTop - shift.y) + 'px';
        mainMapPin.style.left =
          (mainMapPin.offsetLeft - shift.x) + 'px';
        window.form.fillAddress(moveCoords.x, moveCoords.y);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var callback = function (evt) {
    var form = evt.target;
    window.backend.upload(new FormData(form), window.messages.success, window.messages.error);
    evt.preventDefault();
  };
  window.form.setSubmitListener(callback);
})();
