'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var formType = adForm.querySelector('select[name="type"]');
  var formPrice = adForm.querySelector('input[name="price"]');
  var formTimeIn = adForm.querySelector('select[name="timein"]');
  var formTimeOut = adForm.querySelector('select[name="timeout"]');
  var formRooms = adForm.querySelector('select[name="rooms"]');
  var formCapacity = adForm.querySelector('select[name="capacity"]');
  var formReset = document.querySelector('.ad-form__reset');
  var roomNumber = parseInt(formRooms.value, 10);
  var guestNumber = parseInt(formCapacity.value, 10);

  function isFormDisabled() {
    return adForm.classList.contains('ad-form--disabled');
  }
  var onTermOfStayChange = function (field1, field2) {
    field1.addEventListener('change', function () {
      field2.value = field1.value;
    });
  };

  var onRoomOrGuestQuantityChange = function () {
    roomNumber = parseInt(formRooms.value, 10);
    guestNumber = parseInt(formCapacity.value, 10);
    if (roomNumber < guestNumber) {
      formCapacity.setCustomValidity('Количество комнат не соответствует числу гостей');
    } else if (roomNumber === 100 & guestNumber !== 0) {
      formCapacity.setCustomValidity('Так много комнат не для гостей');
    } else {
      formCapacity.setCustomValidity('');
    }
  };
  var onTypeAndPriceChange = function () {
    switch (formType.value) {
      case 'flat':
        formPrice.setAttribute('min', '1000');
        formPrice.setAttribute('placeholder', '1000');
        break;
      case 'bungalo':
        formPrice.setAttribute('min', '0');
        formPrice.setAttribute('placeholder', '0');
        break;
      case 'house':
        formPrice.setAttribute('min', '5000');
        formPrice.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        formPrice.setAttribute('min', '10000');
        formPrice.setAttribute('placeholder', '10000');
        break;
    }
  };
  formRooms.addEventListener('change', onRoomOrGuestQuantityChange);
  formCapacity.addEventListener('change', onRoomOrGuestQuantityChange);
  formType.addEventListener('change', onTypeAndPriceChange);
  onTypeAndPriceChange();
  onRoomOrGuestQuantityChange();
  onTermOfStayChange(formTimeIn, formTimeOut);
  onTermOfStayChange(formTimeOut, formTimeIn);

  window.form = {
    toggle: function () {
      var isDisabled = isFormDisabled();
      if (isDisabled) {
        adForm.classList.remove('ad-form--disabled');
      } else {
        adForm.classList.add('ad-form--disabled');
        adForm.reset();
      }
      var formField = document.querySelectorAll('.ad-form__element');
      for (var i = 0; i < formField.length; i++) {
        formField[i].disabled = !isDisabled;
      }
    },
    fillAddress: function (x, y) {
      adForm.address.value = x + ', ' + y;
    },
    setSubmitListener: function (onSubmit) {
      adForm.addEventListener('submit', onSubmit);
    },
    setResetListener: function (onReset) {
      formReset.addEventListener('click', onReset);
    }
  };
})();
