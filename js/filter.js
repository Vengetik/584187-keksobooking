'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var propertyType = filters.querySelector('select[name="housing-type"]');
  var propertyPrice = filters.querySelector('select[name="housing-price"]');
  var propertyRoomNumber = filters.querySelector('select[name="housing-rooms"]');
  var propertyCapacity = filters.querySelector('select[name="housing-guests"]');
  var propertyFeatures = filters.querySelectorAll('input[name="features"]');
  var renderPins = null;
  var ads = null;

  filters.addEventListener('change', function () {
    var filteredAds = ads.slice(0);

    switch (propertyType.value) {
      case 'flat':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'house':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
    }

    switch (propertyPrice.value) {
      case 'middle':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.price <= window.constant.Price.HIGH &&
            it.offer.price >= window.constant.Price.LOW;
        });
        break;
      case 'low':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.price <= window.constant.Price.LOW;
        });
        break;
      case 'high':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.price >= window.constant.Price.HIGH;
        });
        break;
    }

    switch (propertyRoomNumber.value) {
      case '1':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.rooms === window.constant.Room.ONE;
        });
        break;
      case '2':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.rooms === window.constant.Room.TWO;
        });
        break;
      case '3':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.rooms === window.constant.Room.THREE;
        });
        break;
    }

    switch (propertyCapacity.value) {
      case '1':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.guests === window.constant.Room.ONE;
        });
        break;
      case '2':
        filteredAds = filteredAds.filter(function (it) {
          return it.offer.guests === window.constant.Room.TWO;
        });
        break;
    }
    var filterFeatures = function (feature) {
      filteredAds = filteredAds.filter(function (it) {
        return it.offer.features.indexOf(feature.value) >= 0;
      });
    };
    propertyFeatures.forEach(function (feature) {
      if (feature.checked) {
        filterFeatures(feature);
      }
    });

    window.debounce(function () {
      renderPins(filteredAds);
    });

  });
  var setup = function (data, callback) {
    ads = data;
    renderPins = callback;
  };

  window.filter = {
    setup: setup,

    removeFilters: function () {
      filters.reset();
    }
  };
})();
