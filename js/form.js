'use strict';
(function () {
  var formTypeField = window.domVariables.adForm.elements.type;
  var formPriceField = window.domVariables.adForm.elements.price;
  var formTimeIn = window.domVariables.adForm.elements.timein;
  var formTimeOut = window.domVariables.adForm.elements.timeout;
  var formRooms = window.domVariables.adForm.elements.rooms;
  var formCapacity = window.domVariables.adForm.elements.capacity;

  var onTermOfStayChange = function (field1, field2) {
    field1.addEventListener('change', function () {
      field2.value = field1.value;
    });
  };
  onTermOfStayChange(formTimeIn, formTimeOut);
  onTermOfStayChange(formTimeOut, formTimeIn);

  var onRoomOrGuestQuantityChange = function () {
    var roomNumber = parseInt(formRooms.value, 10);
    var guestNumber = parseInt(formCapacity.value, 10);
    if (roomNumber < guestNumber) {
      formCapacity.setCustomValidity('Количество комнат не соответствует числу гостей');
    } else if (roomNumber === 100 & guestNumber !== 0) {
      formCapacity.setCustomValidity('Так много комнат не для гостей');
    } else {
      formCapacity.setCustomValidity('');
    }
  };

  formTypeField.addEventListener('change', function () {
    if (formTypeField.value === 'bungalo') {
      formPriceField.setAttribute('min', 0);
      formPriceField.setAttribute('placeholder', 0);
    } else if (formTypeField.value === 'flat') {
      formPriceField.setAttribute('min', 1000);
      formPriceField.setAttribute('placeholder', 1000);
    } else if (formTypeField.value === 'house') {
      formPriceField.setAttribute('min', 5000);
      formPriceField.setAttribute('placeholder', 5000);
    } else if (formTypeField.value === 'palace') {
      formPriceField.setAttribute('min', 10000);
      formPriceField.setAttribute('placeholder', 10000);
    }
  });
  formRooms.addEventListener('change', onRoomOrGuestQuantityChange);
  formCapacity.addEventListener('change', onRoomOrGuestQuantityChange);

  window.form = {
    fillFormAddressValue: function () {
      var x = parseInt(window.domVariables.mainMapPin.style.left, 10) + window.pin.MAIN_PIN_WIDTH / 2;
      var y = window.util.isMapActive() ?
        parseInt(window.domVariables.mainMapPin.style.top, 10) +
        window.pin.MAIN_PIN_HEIGHT / 2 :
        parseInt(window.domVariables.mainMapPin.style.top, 10) +
        window.pin.MAIN_PIN_HEIGHT + window.pin.MAIN_PIN_TAIL;

      var value = x + ', ' + y;
      window.domVariables.adForm.address.value = value;
    }
  };
  window.form.fillFormAddressValue();
})();
