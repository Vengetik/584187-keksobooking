'use strict';
(function () {
  var ESC_BUTTON = 27;

  // limit of drag field location
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 150,
    yMax: 700
  };

  // render pin on map
  var offers = window.offers.createOffers();
  var renderPins = function (ad) {
    for (var i = 0; i < ad.length; i++) {
      var pin = window.pin.createPin(ad[i]);
      setListenerToPin(pin, ad[i]);
      window.domVariables.fragment.appendChild(pin);
    }
    window.domVariables.mapPins.appendChild(window.domVariables.fragment);
  };

  // added listener on click for pin
  var setListenerToPin = function (pin, ad) {
    pin.addEventListener('click', function () {
      removeCard();
      renderCard(ad);
    });
  };

  var renderCard = function (cardOffer) {
    var card = window.card.createCard(cardOffer);
    var popupCrossElement = card.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    popupCrossElement.addEventListener('click', onCrossClick);
    window.domVariables.mapBlock.insertBefore(card, window.domVariables.mapBlock.children[3]);
  };

  // Close card cross listener
  var onCrossClick = function () {
    removeCard();
  };
  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      removeCard();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };
  // Close card pin listener
  var removeCard = function () {
    var mapCardElement = window.domVariables.mapBlock.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
    }
  };

  // Disable form elements
  var toggleForm = function (className, hide) {
    var formFields = document.getElementsByClassName(className);
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = hide;
    }
  };
  toggleForm('ad-form__element', true);

  var activatePage = function () {
    window.domVariables.mapBlock.classList.remove('map--faded'); //  Removed map faded
    window.domVariables.adForm.classList.remove('ad-form--disabled'); // Remove blur from form
    toggleForm('ad-form__element', false); // Activate form
    window.form.fillFormAddressValue();
  };

  window.domVariables.mainMapPin.addEventListener('mouseup', function onMainPinDrop() {
    renderPins(offers);
    activatePage();
    window.domVariables.mainMapPin.removeEventListener('mouseup', onMainPinDrop);
  });

  window.domVariables.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var starCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: starCoords.x - moveEvt.clientX,
        y: starCoords.y - moveEvt.clientY
      };
      var newY = window.domVariables.mainMapPin.offsetTop - shift.y;
      var newX = window.domVariables.mainMapPin.offsetLeft - shift.x;
      if (
        newY >= DRAG_LOCATION.yMin - window.pin.MAIN_PIN_HEIGHT &&
        newY <= DRAG_LOCATION.yMax - (window.pin.MAIN_PIN_HEIGHT + window.pin.MAIN_PIN_TAIL) &&
        newX >= DRAG_LOCATION.xMin - window.pin.MAIN_PIN_WIDTH &&
        newX <= DRAG_LOCATION.xMax - window.pin.MAIN_PIN_WIDTH) {
        starCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        window.domVariables.mainMapPin.style.top =
          (window.domVariables.mainMapPin.offsetTop - shift.y) + 'px';
        window.domVariables.mainMapPin.style.left =
          (window.domVariables.mainMapPin.offsetLeft - shift.x) + 'px';
        window.form.fillFormAddressValue();
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
})();

