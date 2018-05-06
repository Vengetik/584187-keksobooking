'use strict';
(function () {
  var mapBlock = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');
  // var pins = function () {
  //   window.pin.getAll();
  // };
  var properties = [];

  var onError = function (e) {
    window.messages.error(e);
  };
  // Close card on cross and esc listener
  var onCrossClick = function () {
    removeCard();
  };
  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.constant.Button.ESC) {
      removeCard();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };
  var renderCard = function (cardOffer) {
    var card = window.card.create(cardOffer);
    var popupCrossElement = card.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    popupCrossElement.addEventListener('click', onCrossClick);
    mapBlock.insertBefore(card, mapBlock.children[3]);
  };
  // Close card pin listener
  var removeCard = function () {
    var mapCardElement = mapBlock.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
    }
  };
  // added listener on click for pin
  var setListenerToPin = function (ad) {
    window.pin.getAll().forEach(function (item) {
      item.addEventListener('click', function () {
        removeCard();
        renderCard(ad);
      });
    });
  };
  var isMapActive = function () {
    return mapBlock.classList.contains('map--faded');
  };
  var getMainPinPrimaryCoords = function () {
    mainMapPin.style.top = window.constant.MainPinStartCoord.Y + 'px';
    mainMapPin.style.left = window.constant.MainPinStartCoord.X + 'px';
  };
  var getMainPinCoords = function () {
    var x = parseInt(mainMapPin.style.left, 10) + window.constant.MainPin.WIDTH / 2;
    var y = isMapActive() ?
      parseInt(mainMapPin.style.top, 10) +
      window.constant.MainPin.HEIGHT / 2 :
      parseInt(mainMapPin.style.top, 10) +
      window.constant.MainPin.HEIGHT + window.constant.MainPin.TAIL;
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
      window.backend.load(onSuccessLoad, onError);
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
        newY >= window.constant.DragField.Y_MIN - window.constant.MainPin.HEIGHT &&
        newY <= window.constant.DragField.Y_MAX - (window.constant.MainPin.HEIGHT + window.constant.MainPin.TAIL) &&
        newX >= window.constant.DragField.X_MIN - window.constant.MainPin.WIDTH &&
        newX <= window.constant.DragField.X_MAX - window.constant.MainPin.WIDTH) {
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

  var resetPage = function () {
    mapBlock.classList.add('map--faded');
    window.form.toggle();
    window.pin.remove();
    getMainPinPrimaryCoords();
    removeCard();
    setMouseUpListener();
    window.form.fillAddress(coords.x, coords.y);
  };
  var onSuccessLoad = function (data) {
    window.filter.listener(data, window.pin.renderAll(data));
    activatePage();
    setListenerToPin(data);
  };
  var onSuccessSubmit = function () {
    resetPage();
    window.messages.success();
  };
  var onReset = function () {
    resetPage();
  };

  var onSubmit = function (evt) {
    var form = evt.target;
    window.backend.upload(new FormData(form), onSuccessSubmit, onError);
    evt.preventDefault();
  };

  window.form.toggle();
  window.form.fillAddress(coords.x, coords.y);
  setMouseUpListener();
  window.form.setSubmitListener(onSubmit);
  window.form.setResetListener(onReset);
})();
