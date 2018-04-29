'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var formTypeField = adForm.elements.type;
  var formPriceField = adForm.elements.price;
  var formTimeIn = adForm.elements.timein;
  var formTimeOut = adForm.elements.timeout;
  var formRooms = adForm.elements.rooms;
  var formCapacity = adForm.elements.capacity;
  var successMessage = document.querySelector('.success');
  function isFormDisabled() {
    return adForm.classList.contains('ad-form--disabled');
  }
  var onTermOfStayChange = function (field1, field2) {
    field1.addEventListener('change', function () {
      field2.value = field1.value;
    });
  };
  onTermOfStayChange(formTimeIn, formTimeOut);
  onTermOfStayChange(formTimeOut, formTimeIn);

  var onError = function (errorMessage) {
    var errorElement = document.createElement('div');

    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black; color: red;';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

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

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      ????????????????????????????????????????????????????????;
      successMessage.classList.remove('hidden');
    }, onError);
    evt.preventDefault();
  });
  window.form = {
    toggle: function () {
      var isDisabled = isFormDisabled();
      if (isDisabled) {
        adForm.classList.remove('ad-form--disabled');
      } else {
        adForm.classList.add('ad-form--disabled');
      }
      var formField = document.querySelectorAll('.ad-form__element');
      for (var i = 0; i < formField.length; i++) {
        formField[i].disabled = !isDisabled;
      }
    },
    fillAddress: function (x, y) {
      adForm.address.value = x + ', ' + y;
    }
  };
})();
