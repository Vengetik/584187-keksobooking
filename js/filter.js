'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var propertyType = filters.querySelector('select[name="housing-type"]');
  var propertyPrice = filters.querySelector('select[name="housing-price"]');
  var propertyRoomNumber = filters.querySelector('select[name="housing-rooms"]');
  var propertyCapacity = filters.querySelector('select[name="housing-guests"]');
  var propertyFeaturesList = filters.querySelectorAll('.input[name="features"]');
  var lastTimeout;
  var renderPins = null;
  var ads = null;

  filters.addEventListener('change', function () {
    var filteredProperties = ads.slice(0);

    switch (propertyType.value) {
      case 'flat':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'house':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
    }

    switch (propertyPrice.value) {
      case 'middle':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price <= window.constant.Price.HIGH &&
            it.offer.price >= window.constant.Price.LOW;
        });
        break;
      case 'low':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price <= window.constant.Price.LOW;
        });
        break;
      case 'high':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price >= window.constant.Price.HIGH;
        });
        break;
    }

    switch (propertyRoomNumber.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === window.constant.Room.ONE;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === window.constant.Room.TWO;
        });
        break;
      case '3':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === window.constant.Room.THREE;
        });
        break;
    }

    switch (propertyCapacity.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === window.constant.Room.ONE;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === window.constant.Room.TWO;
        });
        break;
    }

    for (var i = 0; i < propertyFeaturesList.length; i++) {

      if (propertyFeaturesList[i].checked) {
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.features.indexOf(propertyFeaturesList[i].value) >= 0;
        });
      }
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      renderPins(filteredProperties);
    }, window.constant.DEBOUNCE);
  });
  var removeFeaturesChecked = function () {
    for (var i = 0; i < propertyFeaturesList.length; i++) {
      propertyFeaturesList[i].checked = false;
    }
  };
  var setup = function (data, callback) {
    ads = data;
    renderPins = callback;
  }

  window.filter = {
    setup: setup,

    removeFilters: function () {
      propertyType.selectedIndex = 0;
      propertyPrice.selectedIndex = 0;
      propertyRoomNumber.selectedIndex = 0;
      propertyCapacity.selectedIndex = 0;
      removeFeaturesChecked();
    }
  };
})();
