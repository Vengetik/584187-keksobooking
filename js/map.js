'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  // render pin on map
  var onError = function () {
    return window.messages.error;
  };
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
    if (evt.keyCode === window.const.Button.ESC) {
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
  var getMainPinPrimaryCoords = function () {
    mainMapPin.style.top = window.const.MainPinStartCoord.Y + 'px';
    mainMapPin.style.left = window.const.MainPinStartCoord.X + 'px';
  };
  var getMainPinCoords = function () {
    var x = parseInt(mainMapPin.style.left, 10) + window.const.MainPin.WIDTH / 2;
    var y = isMapActive() ?
      parseInt(mainMapPin.style.top, 10) +
      window.const.MainPin.HEIGHT / 2 :
      parseInt(mainMapPin.style.top, 10) +
      window.const.MainPin.HEIGHT + window.const.MainPin.TAIL;
    return {
      x: x,
      y: y
    };
  };
  var coords = getMainPinCoords();

  var activatePage = function () {
    mapBlock.classList.remove('map--faded'); //  Removed map faded
    window.form.toggle();
    var activeCoords = getMainPinCoords();
    window.form.fillAddress(activeCoords.x, activeCoords.y);
  };
  var setMouseUpListener = function () {
    mainMapPin.addEventListener('mouseup', function onMainPinMouseUp() {
      window.backend.load(function (data) {
        renderPins(data);
        activatePage();
      }, onError);
      mainMapPin.removeEventListener('mouseup', onMainPinMouseUp);
    });
  };
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
        newY >= window.const.DragField.Y_MIN - window.const.MainPin.HEIGHT &&
        newY <= window.const.DragField.Y_MAX - (window.const.MainPin.HEIGHT + window.const.MainPin.TAIL) &&
        newX >= window.const.DragField.X_MIN - window.const.MainPin.WIDTH &&
        newX <= window.const.DragField.X_MAX - window.const.MainPin.WIDTH) {
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
  var onSuccessOrReset = function () {
    mapBlock.classList.add('map--faded');
    window.form.toggle();
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    if () { // НЕ СМОГ ПРОДУМАТЬ КАК ПРОВЕРИТЬ ДЛЯ РЕСЕТА ИЛИ ДЛЯ САБМИТА, ЧТО БЫ ЛИШНИЙ ОБРАБОТЧИК НЕ СОЗДАВАТЬ, ЭТО ВСЕ РАВНО НЕ ПОМОГЛО БЫ, ОБРОБОТЧИК ЛОМАЕТСЯ НА ОТПРАВКЕ...
      window.messages.success();
    }
    getMainPinPrimaryCoords();
    removeCard();
    setMouseUpListener();
    window.form.fillAddress(coords.x, coords.y);
  };
  var onSubmit = function (evt) {
    var form = evt.target;
    window.backend.upload(new FormData(form), onSuccessOrReset, onError);
    evt.preventDefault();
  };
  window.form.toggle();
  window.form.fillAddress(coords.x, coords.y);
  setMouseUpListener();
  window.form.setSubmitListener(onSubmit);
  window.form.setResetListener(onSuccessOrReset);
})();
